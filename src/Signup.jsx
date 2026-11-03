import { useState } from "react";
import "./Auth.css";

const ACCOUNTS_KEY = "zomatoCloneLocalAccounts_v1";

function readLocalAccounts() {
  try {
    const stored = window.localStorage.getItem(ACCOUNTS_KEY);
    const parsed = stored ? JSON.parse(stored) : [];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function createSalt() {
  if (!window.crypto?.getRandomValues) {
    throw new Error("Secure password storage is unavailable. Please run this app on localhost in a modern browser.");
  }

  const bytes = new Uint8Array(16);
  window.crypto.getRandomValues(bytes);
  return Array.from(bytes).map((byte) => byte.toString(16).padStart(2, "0")).join("");
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

function Signup({
  onClose,
  onSwitchToLogin,
  signupName,
  setSignupName,
  signupEmail,
  setSignupEmail,
  signupPassword,
  setSignupPassword,
  acceptedTerms,
  setAcceptedTerms,
  onAccountCreated,
}) {
  const [localName, setLocalName] = useState("");
  const [localEmail, setLocalEmail] = useState("");
  const [localPassword, setLocalPassword] = useState("");
  const [localAcceptedTerms, setLocalAcceptedTerms] = useState(false);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("error");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [passwordStep, setPasswordStep] = useState(false);

  const hasControlledName = typeof signupName === "string" && typeof setSignupName === "function";
  const nameValue = hasControlledName ? signupName : localName;
  const updateName = hasControlledName ? setSignupName : setLocalName;
  const hasControlledEmail = typeof signupEmail === "string" && typeof setSignupEmail === "function";
  const emailValue = hasControlledEmail ? signupEmail : localEmail;
  const updateEmail = hasControlledEmail ? setSignupEmail : setLocalEmail;
  const hasControlledPassword = typeof signupPassword === "string" && typeof setSignupPassword === "function";
  const passwordValue = hasControlledPassword ? signupPassword : localPassword;
  const updatePassword = hasControlledPassword ? setSignupPassword : setLocalPassword;
  const hasControlledTerms = typeof acceptedTerms === "boolean" && typeof setAcceptedTerms === "function";
  const termsAccepted = hasControlledTerms ? acceptedTerms : localAcceptedTerms;
  const updateTerms = hasControlledTerms ? setAcceptedTerms : setLocalAcceptedTerms;

  const canSubmit = nameValue.trim().length > 0 &&
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailValue.trim()) &&
    termsAccepted &&
    (!passwordStep || passwordValue.length >= 6) &&
    !isSubmitting;

  const handleSubmit = async (event) => {
    event.preventDefault();
    setMessage("");

    // Keep the initial signup screen close to the original Zomato reference.
    // Ask for a password in a second step so local account creation still works.
    if (!passwordStep) {
      setPasswordStep(true);
      return;
    }

    setIsSubmitting(true);

    try {
      const normalizedEmail = emailValue.trim().toLowerCase();
      const accounts = readLocalAccounts();
      if (accounts.some((account) => String(account.email || "").toLowerCase() === normalizedEmail)) {
        setMessageType("error");
        setMessage("An account with this email already exists in this browser. Please use Login instead.");
        return;
      }

      const passwordSalt = createSalt();
      const passwordHash = await hashPassword(passwordValue, passwordSalt);
      const newAccount = {
        name: nameValue.trim(),
        email: normalizedEmail,
        passwordSalt,
        passwordHash,
        createdAt: new Date().toISOString(),
      };

      window.localStorage.setItem(ACCOUNTS_KEY, JSON.stringify([...accounts, newAccount]));
      onAccountCreated?.(newAccount.name);
      setMessageType("success");
      setMessage("Account created in this browser. You can now open Login and use this email and password.");
    } catch (error) {
      setMessageType("error");
      setMessage(error?.message || "The account could not be saved in this browser. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const clearMessage = () => setMessage("");

  return (
    <div className="zom-auth-overlay" onClick={onClose}>
      <section
        className="zom-auth-card zom-auth-card-signup"
        role="dialog"
        aria-modal="true"
        aria-labelledby="zom-signup-title"
        onClick={(event) => event.stopPropagation()}
      >
        <header className="zom-auth-header">
          <h2 className="zom-auth-title" id="zom-signup-title">Signup</h2>
          <button className="zom-auth-close" type="button" onClick={onClose} aria-label="Close signup">×</button>
        </header>

        <form className="zom-auth-form zom-signup-form" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Full Name"
            aria-label="Full Name"
            autoComplete="name"
            value={nameValue}
            onChange={(event) => { updateName(event.target.value); clearMessage(); }}
            required
          />
          <input
            type="email"
            placeholder="Email"
            aria-label="Email"
            autoComplete="email"
            value={emailValue}
            onChange={(event) => { updateEmail(event.target.value); clearMessage(); }}
            required
          />
          {passwordStep && (
            <input
              type="password"
              placeholder="Create password (at least 6 characters)"
              aria-label="Create password"
              autoComplete="new-password"
              value={passwordValue}
              onChange={(event) => { updatePassword(event.target.value); clearMessage(); }}
              minLength={6}
              required
              autoFocus
            />
          )}

          <label className="zom-auth-terms">
            <input
              type="checkbox"
              checked={termsAccepted}
              onChange={(event) => { updateTerms(event.target.checked); clearMessage(); }}
              required
            />
            <span>
              I agree to Zomato&apos;s <a href="#terms" onClick={(event) => event.preventDefault()}>Terms of Service</a>, <a href="#privacy" onClick={(event) => event.preventDefault()}>Privacy Policy</a> and <a href="#content-policies" onClick={(event) => event.preventDefault()}>Content Policies</a>
            </span>
          </label>

          <button className="zom-otp-button zom-create-account-button" type="submit" disabled={!canSubmit}>
            {isSubmitting ? "Creating account..." : "Create account"}
          </button>
        </form>

        {message && (
          <p
            className="zom-auth-message"
            role="status"
            style={messageType === "success" ? { background: "#eaf7ee", color: "#216e39" } : undefined}
          >
            {message}
          </p>
        )}

        <div className="zom-auth-divider zom-signup-divider" aria-label="or">
          <span /><span className="zom-divider-word">or</span><span />
        </div>

        <button
          className="zom-google-signin-button"
          type="button"
          onClick={() => {
            setMessageType("error");
            setMessage("Google sign-in is a visual demo only and is not connected to Google authentication.");
          }}
        >
          <span className="zom-google-mark" aria-hidden="true">G</span>
          <span>Continue with Google</span>
        </button>

        <footer className="zom-auth-footer">
          <p>Already have an account? <button type="button" className="zom-auth-link" onClick={onSwitchToLogin}>Login</button></p>
        </footer>
      </section>
    </div>
  );
}

export default Signup;
