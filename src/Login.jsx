import { useState } from "react";
import "./Auth.css";

const ACCOUNTS_KEY = "zomatoCloneLocalAccounts_v1";
const SESSION_KEY = "zomatoCloneLocalSession_v1";

function readLocalAccounts() {
  try {
    const stored = window.localStorage.getItem(ACCOUNTS_KEY);
    const parsed = stored ? JSON.parse(stored) : [];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

async function hashPassword(password, salt) {
  if (!window.crypto?.subtle) {
    throw new Error("Secure password hashing is unavailable. Open this project through Vite on localhost.");
  }

  const data = new TextEncoder().encode(`${salt}:${password}`);
  const digest = await window.crypto.subtle.digest("SHA-256", data);
  return Array.from(new Uint8Array(digest))
    .map((byte) => byte.toString(16).padStart(2, "0"))
    .join("");
}

function Login({
  onClose,
  onSwitchToSignup,
  onLoginSuccess,
  phone,
  setPhone,
  loginMethod,
  setLoginMethod,
  loginEmail,
  setLoginEmail,
  loginPassword,
  setLoginPassword,
}) {
  const [localPhone, setLocalPhone] = useState("");
  const [localMethod, setLocalMethod] = useState("phone");
  const [localEmail, setLocalEmail] = useState("");
  const [localPassword, setLocalPassword] = useState("");
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("error");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const hasControlledPhone = typeof phone === "string" && typeof setPhone === "function";
  const phoneValue = hasControlledPhone ? phone : localPhone;
  const updatePhone = hasControlledPhone ? setPhone : setLocalPhone;

  const hasControlledMethod = typeof loginMethod === "string" && typeof setLoginMethod === "function";
  const method = hasControlledMethod ? loginMethod : localMethod;
  const updateMethod = hasControlledMethod ? setLoginMethod : setLocalMethod;

  const hasControlledEmail = typeof loginEmail === "string" && typeof setLoginEmail === "function";
  const emailValue = hasControlledEmail ? loginEmail : localEmail;
  const updateEmail = hasControlledEmail ? setLoginEmail : setLocalEmail;

  const hasControlledPassword = typeof loginPassword === "string" && typeof setLoginPassword === "function";
  const passwordValue = hasControlledPassword ? loginPassword : localPassword;
  const updatePassword = hasControlledPassword ? setLoginPassword : setLocalPassword;

  const clearMessage = () => setMessage("");

  const handlePhoneSubmit = (event) => {
    event.preventDefault();
    setMessageType("error");
    setMessage(
      "Phone OTP is not connected in this frontend-only project. Create an account with email and password, then use Continue with Email to log in."
    );
  };

  const handleEmailSubmit = async (event) => {
    event.preventDefault();
    setMessage("");
    setIsSubmitting(true);

    try {
      const normalizedEmail = emailValue.trim().toLowerCase();
      const account = readLocalAccounts().find(
        (item) => String(item.email || "").toLowerCase() === normalizedEmail
      );

      if (!account) {
        setMessageType("error");
        setMessage("No account was created for this email in this browser yet. Choose Create account first, then log in with that email and password.");
        return;
      }

      const submittedHash = await hashPassword(passwordValue, account.passwordSalt);
      if (submittedHash !== account.passwordHash) {
        setMessageType("error");
        setMessage("The password doesn't match the local account. Please try again or create a new account with a different email.");
        return;
      }

      const session = {
        name: account.name,
        email: account.email,
        signedInAt: new Date().toISOString(),
      };
      window.localStorage.setItem(SESSION_KEY, JSON.stringify(session));
      setMessageType("success");
      setMessage(`Login successful. Welcome back, ${account.name}!`);
      onLoginSuccess?.(account.name, account.email);
      window.setTimeout(() => onClose?.(), 650);
    } catch (error) {
      setMessageType("error");
      setMessage(error?.message || "We couldn't check this local account. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const changeMethod = (nextMethod) => {
    updateMethod(nextMethod);
    clearMessage();
  };

  return (
    <div className="zom-auth-overlay" onClick={onClose}>
      <section
        className={`zom-auth-card zom-auth-card-login ${method === "email" ? "zom-auth-card-login-email" : ""}`}
        role="dialog"
        aria-modal="true"
        aria-labelledby="zom-login-title"
        onClick={(event) => event.stopPropagation()}
      >
        <header className="zom-auth-header">
          <h2 className="zom-auth-title" id="zom-login-title">Login</h2>
          <button className="zom-auth-close" type="button" onClick={onClose} aria-label="Close login">×</button>
        </header>

        {method === "phone" ? (
          <>
            <form className="zom-auth-form" onSubmit={handlePhoneSubmit}>
              <div className="zom-phone-input">
                <label className="zom-phone-country">
                  <span className="zom-country-flag" aria-hidden="true">🇮🇳</span>
                  <select aria-label="Country calling code" defaultValue="+91">
                    <option value="+91">+91</option>
                    <option value="+1">+1</option>
                    <option value="+44">+44</option>
                    <option value="+61">+61</option>
                    <option value="+971">+971</option>
                  </select>
                </label>
                <span className="zom-phone-separator" aria-hidden="true" />
                <input
                  className="zom-phone-number"
                  type="tel"
                  inputMode="numeric"
                  autoComplete="tel-national"
                  aria-label="Phone number"
                  placeholder="Phone"
                  value={phoneValue}
                  onChange={(event) => { updatePhone(event.target.value); clearMessage(); }}
                  pattern="[0-9 ()-]{7,15}"
                  title="Enter a phone number using 7 to 15 digits."
                  required
                />
              </div>
              <button className="zom-otp-button" type="submit">Send One Time Password</button>
            </form>

            <div className="zom-auth-divider" aria-label="or">
              <span /><span className="zom-divider-word">or</span><span />
            </div>

            <button className="zom-email-button" type="button" onClick={() => changeMethod("email")}>
              <span className="zom-email-icon" aria-hidden="true">✉</span>
              Continue with Email
            </button>
          </>
        ) : (
          <>
            <p className="zom-auth-subtitle">Log in with an account created in this Zomato clone.</p>
            <form className="zom-auth-form zom-email-login-form" onSubmit={handleEmailSubmit}>
              <input
                type="email"
                placeholder="Email"
                aria-label="Email address"
                autoComplete="email"
                value={emailValue}
                onChange={(event) => { updateEmail(event.target.value); clearMessage(); }}
                required
              />
              <input
                type="password"
                placeholder="Password"
                aria-label="Password"
                autoComplete="current-password"
                minLength={6}
                value={passwordValue}
                onChange={(event) => { updatePassword(event.target.value); clearMessage(); }}
                required
              />
              <button className="zom-otp-button" type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Checking..." : "Login"}
              </button>
            </form>
            <button className="zom-switch-method" type="button" onClick={() => changeMethod("phone")}>
              Use phone number instead
            </button>
          </>
        )}

        {message && (
          <p
            className="zom-auth-message"
            role="status"
            style={messageType === "success" ? { background: "#eaf7ee", color: "#216e39" } : undefined}
          >
            {message}
          </p>
        )}

        <footer className="zom-auth-footer">
          <p>New to Zomato? <button type="button" className="zom-auth-link" onClick={onSwitchToSignup}>Create account</button></p>
        </footer>
      </section>
    </div>
  );
}

export default Login;
