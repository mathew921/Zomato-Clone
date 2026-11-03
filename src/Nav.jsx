
import "./Nav.css";
import { MapPin, ChevronDown, Search } from "lucide-react";

function Nav({
    search,
    setSearch,
    location,
    setLocation,
    openLogin,
    openSignup,
    openLocation,
    userName,
    onLogout
}) {
    return (

        <header className="navbar">
            <div className="nav-inner">
                <img
                    src="https://b.zmtcdn.com/web_assets/b40b97e677bc7b2ca77c58c61db266fe1603954218.png"
                    alt="Zomato"
                    className="zomato-logo"
                />

                <div className="location-box">
                    <span className="location-icon">
                        <MapPin size={22} color="#EF4F5F" strokeWidth={2} /></span>

                    <button
                        className="location-city-btn"
                        onClick={openLocation}
                        type="button"
                    >
                        Kochi, India
                    </button>
                    <button
                        className="location-open-btn"
                        onClick={openLocation}
                        type="button"
                        aria-label="Open location options"
                    >
                        ▼
                    </button>
                </div>

                <div className="nav-search">
                    <span className="search-icon">
                        <Search size={18} color="#828282" /></span>
                    <input
                        type="text"
                        placeholder="Search for restaurant, cuisine or a dish"
                        value={search}
                        onChange={(event) => setSearch(event.target.value)}
                    />
                </div>

                {userName ? (
                    <>
                        <span className="nav-user-name">Hi, {userName}</span>
                        <button
                            className="login-btn"
                            onClick={onLogout}
                            type="button"
                        >
                            Log out
                        </button>
                    </>
                ) : (
                    <>
                        <button
                            className="login-btn"
                            onClick={openLogin}
                            type="button"
                        >
                            Log in
                        </button>

                        <button
                            className="signup-btn"
                            onClick={openSignup}
                            type="button"
                        >
                            Sign up
                        </button>
                    </>
                )}
            </div>
        </header>

    );
}

export default Nav;
