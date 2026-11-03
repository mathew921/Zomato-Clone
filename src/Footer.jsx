
import { useState } from "react";
import "./Footer.css";

const footerSections = [
    {
        id: "cuisines",
        title: "Popular cuisines near me",
        links: [
            "Arabian", "Bakery", "Beverages", "Biryani", "Burger", "Chinese",
            "Continental", "Desserts", "Ice Cream", "Juices", "Kerala",
            "North Indian", "Pizza", "Rolls", "Sandwich", "Seafood", "Shake",
            "Shawarma", "South Indian", "Street Food",
        ].map((item) => `${item} near me`),
    },
    {
        id: "types",
        title: "Popular restaurant types near me",
        links: [
            "Bakeries", "Bars", "Beverage Shops", "Cafés", "Casual Dining",
            "Dessert Parlors", "Dhabas", "Fine Dining", "Food Courts",
            "Food Trucks", "Kiosks", "Paan Shop", "Quick Bites", "Sweet Shops",
        ].map((item) => `${item} near me`),
    },
    {
        id: "cities",
        title: "Explore Dining Cities at Zomato",
        links: [
            "Agartala", "Agra", "Ahmedabad", "Ajmer", "Akola",
            "Alappuzha", "Amritsar", "Bengaluru", "Bhopal", "Chandigarh",
            "Chennai", "Coimbatore", "Delhi NCR", "Goa", "Hyderabad",
            "Indore", "Jaipur", "Kochi", "Kolkata", "Kozhikode",
            "Lucknow", "Mumbai", "Mysore", "Pune", "Thiruvananthapuram",
            "Thrissur", "Vadodara", "Vijayawada", "Visakhapatnam",
        ],
    },
    {
        id: "locations",
        title: "Restaurants in Popular Locations",
        links: [
            "Restaurants in Kochi",
            "Restaurants in Edappally",
            "Restaurants in Kakkanad",
            "Restaurants in Fort Kochi",
            "Restaurants in Panampilly Nagar",
            "Restaurants in MG Road",
        ],
    },
    {
        id: "fun",
        title: "Discover More Fun",
        links: [
            "Food Trends",
            "Food Stories",
            "Dining Guides",
            "Restaurant Collections",
        ],
    },
];

const footerColumns = [
    {
        title: "ABOUT ZOMATO",
        links: [
            "Who We Are", "Blog", "Work With Us", "Investor Relations",
            "Report Fraud", "Press Kit", "Contact Us",
        ],
    },
    {
        title: "ZOMAVERSE",
        links: [
            "Zomato", "Blinkit", "District", "Feeding India",
            "Hyperpure", "Eternal SBI Credit Card", "Zomato Live",
            "Zomaland", "Weather Union",
        ],
    },
    {
        title: "FOR RESTAURANTS",
        links: ["Partner With Us", "Apps For You"],
    },
    {
        title: "LEARN MORE",
        links: ["Privacy", "Security", "Terms"],
    },
];

const footerLinkUrls = {
    "Who We Are": "https://www.zomato.com/who-we-are",
    Blog: "https://blog.zomato.com/",
    "Work With Us": "https://www.zomato.com/careers",
    "Investor Relations": "https://www.eternal.com/investor-relations/",
    "Report Fraud": "https://www.zomato.com/report-fraud",
    "Press Kit": "https://blog.zomato.com/press-kit",
    "Contact Us": "https://www.zomato.com/contact",
    Zomato: "https://www.zomato.com/",
    Blinkit: "https://blinkit.com/",
    District: "https://www.district.in/",
    "Feeding India": "https://www.feedingindia.org/",
    Hyperpure: "https://www.hyperpure.com/",
    "Eternal SBI Credit Card": "https://www.eternal.com/",
    "Zomato Live": "https://www.zomato.com/",
    Zomaland: "https://www.zomato.com/",
    "Weather Union": "https://www.weatherunion.com/",
    "Partner With Us": "https://www.zomato.com/partner-with-us",
    "Apps For You": "https://www.zomato.com/mobile",
    Privacy: "https://www.zomato.com/policies/privacy/",
    Security: "https://www.zomato.com/policies/security/",
    Terms: "https://www.zomato.com/policies/terms-of-service/",
};

const getExploreLinkUrl = (sectionId, link) => {
    if (sectionId === "cities") {
        const city = link.toLowerCase().replaceAll(" ", "-");
        return `https://www.zomato.com/${city}/restaurants`;
    }
    return `https://www.zomato.com/kochi/search?q=${encodeURIComponent(link)}`;
};

function Footer({ hideExplore = false }) {
    const [openSections, setOpenSections] = useState({
        cuisines: false,
        types: false,
        cities: false,
        locations: false,
        fun: false,
    });

    const toggleSection = (id) => {
        setOpenSections((previous) => ({
            ...previous,
            [id]: !previous[id],
        }));
    };

    return (
        <footer className="zomato-footer">

            {!hideExplore && <div className="footer-explore">
                <h2 className="footer-main-title">Explore options near me</h2>

                {footerSections.map((section) => (
                    <section className="footer-panel" key={section.id}>
                        <button
                            className="footer-panel-heading"
                            type="button"
                            aria-expanded={openSections[section.id]}
                            onClick={() => toggleSection(section.id)}
                        >
                            <span>{section.title}</span>
                            <span className="footer-chevron">
                                {openSections[section.id] ? "⌃" : "⌄"}
                            </span>
                        </button>

                        {openSections[section.id] && (
                            <div
                                className={
                                    section.id === "cities"
                                        ? "footer-city-grid"
                                        : "footer-links"
                                }
                            >
                                {section.links.map((link) => (
                                    <a
                                        href={getExploreLinkUrl(section.id, link)}
                                        key={link}
                                        target="_blank"
                                        rel="noreferrer"
                                    >
                                        {link}
                                    </a>
                                ))}
                            </div>
                        )}
                    </section>
                ))}
            </div>}

            <div className="footer-main">
                <div className="footer-brand-row">
                    <img
                        className="footer-logo"
                        src="https://b.zmtcdn.com/web_assets/b40b97e677bc7b2ca77c58c61db266fe1603954218.png"
                        alt="Zomato"
                    />

                    <div className="footer-selectors">
                        <label className="footer-selector" aria-label="Select country">
                            <img className="footer-flag" src="https://flagcdn.com/w40/in.png" alt="Indian flag" />
                            <select defaultValue="India" aria-label="Country">
                                <option value="India">India</option>
                            </select>
                            <i className="bi bi-chevron-down" aria-hidden="true"></i>
                        </label>
                        <label className="footer-selector" aria-label="Select language">
                            <i className="bi bi-globe" aria-hidden="true"></i>
                            <select defaultValue="English" aria-label="Language">
                                <option value="English">English</option>
                            </select>
                            <i className="bi bi-chevron-down" aria-hidden="true"></i>
                        </label>
                    </div>
                </div>

                <div className="footer-columns">
                    {footerColumns.map((column) => (
                        <section className="footer-column" key={column.title}>
                            <h3>{column.title}</h3>
                            {column.links.map((link) => (
                                <a
                                    href={footerLinkUrls[link] || "https://www.zomato.com/"}
                                    key={link}
                                    target="_blank"
                                    rel="noreferrer"
                                >
                                    {link}
                                </a>
                            ))}
                        </section>
                    ))}

                    <section className="footer-column footer-social">
                        <h3>SOCIAL LINKS</h3>
                        <div className="footer-social-icons">
                            <a href="https://www.linkedin.com/company/zomato?originalSubdomain=in" target="_blank" rel="noreferrer" aria-label="Zomato on LinkedIn"><i className="bi bi-linkedin" aria-hidden="true"></i></a>
                            <a href="https://www.instagram.com/zomato/" target="_blank" rel="noreferrer" aria-label="Zomato on Instagram"><i className="bi bi-instagram" aria-hidden="true"></i></a>
                            <a href="https://x.com/zomato" target="_blank" rel="noreferrer" aria-label="Zomato on X"><i className="bi bi-twitter-x" aria-hidden="true"></i></a>
                            <a href="https://www.youtube.com/zomato" target="_blank" rel="noreferrer" aria-label="Zomato on YouTube"><i className="bi bi-youtube" aria-hidden="true"></i></a>
                            <a href="https://www.facebook.com/zomato" target="_blank" rel="noreferrer" aria-label="Zomato on Facebook"><i className="bi bi-facebook" aria-hidden="true"></i></a>
                        </div>

                        <a
                            className="footer-app-badge"
                            href="https://link.zomato.com/xqzv/downloadZomatoIos"
                            target="_blank"
                            rel="noreferrer"
                        >
                            <span className="footer-badge-top"><i className="bi bi-apple" aria-hidden="true"></i> Download on the</span>
                            <strong>App Store</strong>
                        </a>

                        <a
                            className="footer-app-badge"
                            href="https://link.zomato.com/xqzv/downloadZomatoAndroid"
                            target="_blank"
                            rel="noreferrer"
                        >
                            <span className="footer-badge-top"><i className="bi bi-google-play" aria-hidden="true"></i> GET IT ON</span>
                            <strong>Google Play</strong>
                        </a>
                    </section>
                </div>

                <div className="footer-legal">
                    By continuing past this page, you agree to our Terms of Service,
                    Cookie Policy, Privacy Policy and Content Policies. All trademarks
                    are properties of their respective owners. 2008-
                    {new Date().getFullYear()} © Zomato™ Ltd. All rights reserved.
                </div>
            </div>
        </footer>
    );
}

export default Footer;
