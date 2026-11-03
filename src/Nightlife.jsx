import { useRef, useState } from "react";
import "./Nightlife.css";

const nightlifeCollections = [
  {
    title: "Pubs & Bars",
    description: "Drinks and good vibes",
    image: "https://images.unsplash.com/photo-1514933651103-005eec06c04b?auto=format&fit=crop&w=1000&q=85",
  },
  {
    title: "Rooftop Lounges",
    description: "Enjoy the night view",
    image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1000&q=85",
  },
  {
    title: "Live Music",
    description: "Music and entertainment",
    image: "https://images.pexels.com/photos/27570912/pexels-photo-27570912.jpeg",
  },
  {
    title: "Late-Night Dining",
    description: "Food after dark",
    image: "https://images.pexels.com/photos/16552425/pexels-photo-16552425.jpeg",
  },
  {
    title: "Cocktail Bars",
    description: "Discover creative cocktails and bar vibes",
    image: "https://images.pexels.com/photos/36366519/pexels-photo-36366519.jpeg",
  },
  {
    title: "Dance Clubs",
    description: "Music, lights and dancing all night",
    image: "https://images.pexels.com/photos/5192307/pexels-photo-5192307.jpeg",
  },
  {
    title: "Sports Bars",
    description: "Catch live games with friends",
    image: "https://images.pexels.com/photos/33749073/pexels-photo-33749073.jpeg",
  },
  {
    title: "Fine Dining After Dark",
    description: "Elegant dinners and evening experiences",
    image: "https://images.pexels.com/photos/10442667/pexels-photo-10442667.jpeg",
  },
];

const nightlifePlaces = [
  {
    name: "Skyline Rooftop",
    type: "Rooftop lounge",
    cuisine: "Not verified (project placeholder)",
    price: "2,300 for two",
    location: "Kochi",
    rating: 4.3,
    image: "https://images.pexels.com/photos/29455146/pexels-photo-29455146.jpeg",
  },
  {
    name: "The Orb Restobar",
    type: "Bar & lounge",
    cuisine: "Continental, North Indian, Kerala, Asian",
    price: "2,300 for two",
    location: "Tripunithura, Kochi",
    rating: 4.1,
    image: "https://images.pexels.com/photos/14882031/pexels-photo-14882031.jpeg",
  },
  {
    name: "Hotel Seagull",
    type: "Bar and Lounge",
    cuisine: "Kerala, Seafood, Chinese, Biryani",
    price: "1,000 for one",
    location: "Fort Kochi",
    rating: 4.0,
    image: "https://images.pexels.com/photos/331107/pexels-photo-331107.jpeg",
  },
  {
    name: "Millennials Restobar",
    type: "Bar and Dinner",
    cuisine: "Multi-cuisine, bar food",
    price: "1,500 for one",
    location: "Kathrikadavu, Kaloor, Kochi",
    rating: 4.3,
    image: "https://images.pexels.com/photos/6070967/pexels-photo-6070967.jpeg",
  },
  {
    name: "Sky Lounge 10 - Olive Downtown",
    type: "Bar and Dinner",
    cuisine: "Continental, American",
    price: "1,500 for one",
    location: "Kadavanthra, Kochi",
    rating: 4.5,
    image: "https://images.pexels.com/photos/19615777/pexels-photo-19615777.jpeg",
    offer: "20% OFF up to ₹500", // Sample project offer; not a verified venue promotion.
  },
  {
    name: "Mayabay The Tropical Restobar",
    type: "Tropical restobar",
    cuisine: "Finger food, Continental, Italian, Beverages",
    price: "2,000 for two",
    location: "Kakkanad, Kochi",
    rating: 4.0,
    image: "https://images.pexels.com/photos/15879552/pexels-photo-15879552.jpeg",
  },
  {
    name: "Sky Grill Lounge Bar & Restaurant",
    type: "Rooftop bar & grill",
    cuisine: "Continental, BBQ, Fusion, Italian",
    price: "3,200 for two",
    location: "Kundannoor Junction, Maradu, Kochi",
    rating: 4.8,
    image: "https://images.pexels.com/photos/331107/pexels-photo-331107.jpeg",
    offer: "15% OFF up to ₹300", // Sample project offer; not a verified venue promotion.
  },
  {
    name: "Watson's Kochi",
    type: "Pub & bar",
    cuisine: "South Indian, North Indian",
    price: "1,000 for one",
    location: "Kacheripady, Kochi",
    rating: 4.5,
    image: "https://images.pexels.com/photos/35675963/pexels-photo-35675963.jpeg",
    offer: "10% OFF on food bill", // Sample project offer; not a verified venue promotion.
  },
  {
    name: "Blue Rock Resto Bar - Olive Downtown",
    type: "Bar & restaurant",
    cuisine: "Asian, Kerala",
    price: "1,200 for two",
    location: "Kadavanthra, Kochi",
    rating: 4.6,
    image: "https://images.pexels.com/photos/5531168/pexels-photo-5531168.jpeg?auto=compress&cs=tinysrgb&w=1000",
  },
  {
    name: "Rocks and Brews",
    type: "Pub & bar",
    cuisine: "South Indian, North Indian, Continental",
    price: "1,600 for two",
    location: "Petta, Maradu, Kochi",
    rating: 4.7,
    image: "https://images.pexels.com/photos/5865076/pexels-photo-5865076.jpeg?auto=compress&cs=tinysrgb&w=1000",
  },
  {
    name: "Booyah Resto Bar",
    type: "Pub & resto bar",
    cuisine: "Pizza, Continental, South Indian, Italian, Chinese, Seafood, Bar Food",
    price: "1,500 for one",
    location: "Kacheripady, Kochi",
    rating: 4.5,
    image: "https://images.pexels.com/photos/6877609/pexels-photo-6877609.jpeg",
    offer: "₹200 OFF above ₹1,000", // Sample project offer; not a verified venue promotion.
  },
  {
    name: "Velocity Kochi",
    type: "Pub & bar",
    cuisine: "North Indian, Asian, Chinese, bar food",
    price: "1,800 for two",
    location: "Banerji Road, Marine Drive, Kochi",
    rating: 4.4,
    image: "https://images.pexels.com/photos/941864/pexels-photo-941864.jpeg",
  },
];

const nightlifeDemoDistancesKm = {
  "Skyline Rooftop": 4.8,
  "The Orb Restobar": 5.5,
  "Hotel Seagull": 12.1,
  "Millennials Restobar": 3.2,
  "Sky Lounge 10 - Olive Downtown": 4.1,
  "Mayabay The Tropical Restobar": 8.5,
  "Sky Grill Lounge Bar & Restaurant": 10.4,
  "Watson's Kochi": 2.1,
  "Blue Rock Resto Bar - Olive Downtown": 4.4,
  "Rocks and Brews": 9.7,
  "Booyah Resto Bar": 2.0,
  "Velocity Kochi": 3.5,
}; // Sample distances for project sorting only; not real navigation distances.

const nightlifeFilterTabs = ["Sort by", "Cuisines", "Rating", "Cost for two", "More filters"];
const nightlifeCuisineOptions = [
  "Kerala", "Seafood", "Chinese", "Biryani", "Continental", "North Indian",
  "South Indian", "Italian", "Asian", "Bar food", "BBQ", "American", "Beverages", "Pizza", "Fusion",
];
const nightlifeSortOptions = ["Popularity", "Rating: High to Low", "Cost: Low to High", "Cost: High to Low", "Distance"];
const nightlifeRatingOptions = ["Any rating", "3.5+", "4.0+", "4.5+"];
const nightlifeCostOptions = ["Any budget", "Up to ₹1,000", "₹1,001–₹1,500", "₹1,501–₹2,000", "Above ₹2,000"];
const nightlifeMoreOptions = ["Offers available", "Pubs & Bars", "Rooftop lounges", "Bar & lounge"];

const getListedPrice = (price = "") => {
  const value = Number(String(price).replace(/[^0-9]/g, ""));
  return Number.isFinite(value) ? value : 0;
};

function Nightlife({ search = "" }) {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [activeFilterTab, setActiveFilterTab] = useState("Sort by");
  const [appliedSort, setAppliedSort] = useState("Popularity");
  const [draftSort, setDraftSort] = useState("Popularity");
  const [appliedCuisines, setAppliedCuisines] = useState([]);
  const [draftCuisines, setDraftCuisines] = useState([]);
  const [appliedRating, setAppliedRating] = useState("Any rating");
  const [draftRating, setDraftRating] = useState("Any rating");
  const [appliedCost, setAppliedCost] = useState("Any budget");
  const [draftCost, setDraftCost] = useState("Any budget");
  const [appliedMore, setAppliedMore] = useState([]);
  const [draftMore, setDraftMore] = useState([]);
  const collectionsCarouselRef = useRef(null);

  const scrollCollections = () => {
    const carousel = collectionsCarouselRef.current;
    if (!carousel) return;

    const maxScroll = carousel.scrollWidth - carousel.clientWidth;
    if (maxScroll <= 0) return;

    const isAtEnd = carousel.scrollLeft >= maxScroll - 8;
    const nextLeft = isAtEnd
      ? 0
      : Math.min(carousel.scrollLeft + carousel.clientWidth + 20, maxScroll);

    carousel.scrollTo({ left: nextLeft, behavior: "smooth" });
  };

  const openFilters = () => {
    setDraftSort(appliedSort);
    setDraftCuisines([...appliedCuisines]);
    setDraftRating(appliedRating);
    setDraftCost(appliedCost);
    setDraftMore([...appliedMore]);
    setActiveFilterTab("Sort by");
    setFiltersOpen(true);
  };

  const toggleItem = (items, setItems, item) => {
    setItems(items.includes(item) ? items.filter((value) => value !== item) : [...items, item]);
  };

  const applyModalFilters = () => {
    setAppliedSort(draftSort);
    setAppliedCuisines([...draftCuisines]);
    setAppliedRating(draftRating);
    setAppliedCost(draftCost);
    setAppliedMore([...draftMore]);
    setSelectedCategory("All");
    setFiltersOpen(false);
  };

  const clearAllFilters = () => {
    setDraftSort("Popularity");
    setAppliedSort("Popularity");
    setDraftCuisines([]);
    setAppliedCuisines([]);
    setDraftRating("Any rating");
    setAppliedRating("Any rating");
    setDraftCost("Any budget");
    setAppliedCost("Any budget");
    setDraftMore([]);
    setAppliedMore([]);
    setSelectedCategory("All");
  };

  const selectedAdvancedFilters =
    appliedSort !== "Popularity" || appliedCuisines.length > 0 ||
    appliedRating !== "Any rating" || appliedCost !== "Any budget" || appliedMore.length > 0;

  const chooseQuickFilter = (value) => {
    setSelectedCategory((current) => current === value ? "All" : value);
  };

  const filteredPlaces = nightlifePlaces.filter((place) => {
    const query = search.trim().toLowerCase().replace(/\s+/g, " ");
    const searchText = `${place.name} ${place.type} ${place.cuisine} ${place.location} ${place.description || ""} ${(place.tags || []).join(" ")}`.toLowerCase();
    const nightlifeAliases = {
      "pub": ["pub", "bar", "restobar"],
      "pubs": ["pub", "bar", "restobar"],
      "bars": ["bar", "pub", "restobar", "lounge"],
      "rooftop": ["rooftop", "lounge", "sky"],
      "cocktail": ["cocktail", "bar", "lounge"],
      "live music": ["live music", "music", "entertainment"],
      "seafood": ["seafood", "fish", "kerala"],
    };
    const queryWords = query.split(" ").filter(Boolean);
    const matchesSearch = !query || searchText.includes(query) ||
      (queryWords.length > 1 && queryWords.every((word) => searchText.includes(word))) ||
      (nightlifeAliases[query] || []).some((term) => searchText.includes(term));

    let matchesQuickCategory = true;
    if (selectedCategory === "Rating 4.5+") {
      matchesQuickCategory = Number(place.rating) >= 4.5;
    } else if (selectedCategory === "Offers") {
      matchesQuickCategory = Boolean(place.offer);
    } else if (selectedCategory === "Pubs & Bars") {
      matchesQuickCategory = /bar|restobar|pub/i.test(`${place.type} ${place.name}`);
    } else if (selectedCategory !== "All") {
      matchesQuickCategory = place.type === selectedCategory;
    }

    const matchesCuisines = appliedCuisines.length === 0 || appliedCuisines.some((cuisine) =>
      place.cuisine.toLowerCase().includes(cuisine.toLowerCase())
    );

    const minRating = appliedRating === "Any rating" ? 0 : Number.parseFloat(appliedRating);
    const matchesRating = Number(place.rating) >= minRating;

    const cost = getListedPrice(place.price);
    let matchesCost = true;
    if (appliedCost === "Up to ₹1,000") matchesCost = cost > 0 && cost <= 1000;
    else if (appliedCost === "₹1,001–₹1,500") matchesCost = cost >= 1001 && cost <= 1500;
    else if (appliedCost === "₹1,501–₹2,000") matchesCost = cost >= 1501 && cost <= 2000;
    else if (appliedCost === "Above ₹2,000") matchesCost = cost > 2000;

    const matchesMore = appliedMore.every((filter) => {
      if (filter === "Offers available") return Boolean(place.offer);
      if (filter === "Pubs & Bars") return /bar|restobar|pub/i.test(`${place.type} ${place.name}`);
      if (filter === "Rooftop lounges") return /rooftop/i.test(place.type);
      if (filter === "Bar & lounge") return /bar.*lounge|lounge.*bar/i.test(place.type);
      return true;
    });

    return matchesSearch && matchesQuickCategory && matchesCuisines && matchesRating && matchesCost && matchesMore;
  });

  const visiblePlaces = [...filteredPlaces].sort((a, b) => {
    if (appliedSort === "Rating: High to Low") return Number(b.rating) - Number(a.rating);
    if (appliedSort === "Cost: Low to High") return getListedPrice(a.price) - getListedPrice(b.price);
    if (appliedSort === "Cost: High to Low") return getListedPrice(b.price) - getListedPrice(a.price);
    if (appliedSort === "Distance") return (nightlifeDemoDistancesKm[a.name] ?? 999) - (nightlifeDemoDistancesKm[b.name] ?? 999);
    return 0;
  });

  return (
    <main className="nightlife-page">
      <section className="nightlife-collections">
        <div className="nightlife-collections-header">
          <div>
            <h1>Collections</h1>
            <p>Explore curated places for pubs, bars, lounges and live music in Kochi.</p>
          </div>
          <a className="nightlife-all-collections" href="#nightlife-collection-grid">
            All collections in Kochi <span aria-hidden="true">›</span>
          </a>
        </div>

        <div className="nightlife-collections-carousel-wrap">
          <div className="nightlife-collections-carousel" ref={collectionsCarouselRef}>
            <div className="nightlife-collection-grid" id="nightlife-collection-grid">
              {nightlifeCollections.map((item) => (
                <article className="nightlife-collection-card" key={item.title}>
                  <img src={item.image} alt={item.title} loading="lazy" />
                  <div className="nightlife-card-overlay">
                    <h2>{item.title}</h2>
                    <p>{item.description}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
          <button type="button" className="nightlife-collection-next" aria-label="Show next collections" onClick={scrollCollections}>
            <span aria-hidden="true">›</span>
          </button>
        </div>
      </section>

      <div className="nightlife-filters" aria-label="Nightlife filters">
        <button type="button" className={selectedAdvancedFilters ? "active" : ""} onClick={openFilters} aria-haspopup="dialog" aria-expanded={filtersOpen}>
          Filters{selectedAdvancedFilters ? " · Applied" : ""}
        </button>
        <button type="button" className={selectedCategory === "Offers" ? "active" : ""} onClick={() => chooseQuickFilter("Offers")} aria-pressed={selectedCategory === "Offers"}>
          Offers
        </button>
        <button type="button" className={selectedCategory === "Rating 4.5+" ? "active" : ""} onClick={() => chooseQuickFilter("Rating 4.5+")} aria-pressed={selectedCategory === "Rating 4.5+"}>
          Rating: 4.5+
        </button>
        <button type="button" className={selectedCategory === "Pubs & Bars" ? "active" : ""} onClick={() => chooseQuickFilter("Pubs & Bars")} aria-pressed={selectedCategory === "Pubs & Bars"}>
          Pubs &amp; Bars
        </button>
      </div>

      <section className="nightlife-promo-banner">
        <img className="nightlife-promo-image" src="/images/dining-banner.png" alt="Nightlife offers" onError={(event) => { event.currentTarget.onerror = null; event.currentTarget.src = "https://images.pexels.com/photos/20329661/pexels-photo-20329661.jpeg"; }} />
        <div className="nightlife-promo-content">
          <p className="nightlife-promo-eyebrow">GREAT NIGHTS, GREAT DEALS</p>
          <p className="nightlife-promo-intro">Get up to</p>
          <h2>50% OFF</h2>
          <p className="nightlife-promo-description">on your night out with Zomato</p>
          <button type="button" onClick={() => { chooseQuickFilter("Offers"); document.querySelector(".nightlife-places")?.scrollIntoView({ behavior: "smooth" }); }}>
            Explore nightlife offers
          </button>
        </div>
      </section>

      <section className="nightlife-places">
        <div className="nightlife-places-header">
          <div>
            <h2>Places for a night out</h2>
            <p>Discover pubs, lounges and late-night dining in Kochi.</p>
          </div>
          <label className="nightlife-category-filter">
            <span>Category</span>
            <select
              value={["Rating 4.5+", "Offers", "Pubs & Bars"].includes(selectedCategory) ? "All" : selectedCategory}
              onChange={(event) => setSelectedCategory(event.target.value)}
            >
              <option value="All">All places</option>
              <option value="Rooftop lounge">Rooftop lounges</option>
              <option value="Bar & lounge">Bars &amp; lounges</option>
              <option value="Bar and Lounge">Bar and lounge</option>
              <option value="Bar and Dinner">Bar and dinner</option>
              <option value="Tropical restobar">Tropical restobars</option>
              <option value="Rooftop bar & grill">Rooftop bar &amp; grill</option>
              <option value="Pub & bar">Pubs &amp; bars</option>
              <option value="Bar & restaurant">Bar &amp; restaurant</option>
              <option value="Pub & resto bar">Pub &amp; resto bar</option>
            </select>
          </label>
        </div>

        <div className="nightlife-place-grid">
          {visiblePlaces.map((place) => (
            <article className={`nightlife-place-card${place.offer ? " has-offer" : ""}`} key={place.name}>
              {place.offer && <span className="nightlife-offer-badge">{place.offer}</span>}
              <img className="nightlife-place-image" src={place.image} alt={place.name} loading="lazy" />
              <div className="nightlife-place-info">
                <div className="nightlife-place-title-row">
                  <h3>{place.name}</h3>
                  <span className="nightlife-rating" aria-label={`Rating ${place.rating} out of 5`}>
                    {place.rating} ★
                  </span>
                </div>
                <p className="nightlife-place-cuisine" title={`Cuisine: ${place.cuisine}`}>
                  <strong>Cuisine:</strong> {place.cuisine}
                </p>
                <p className="nightlife-place-type"><strong>Type:</strong> {place.type}</p>
                <div className="nightlife-place-meta">
                  <span className="nightlife-place-price" title="Price is from this project's sample data; some entries are per person and others per two.">
                    {place.price || "Price unavailable"}
                  </span>
                  <span className="nightlife-place-location" title={place.location}>{place.location}</span>
                </div>
              </div>
            </article>
          ))}
          {visiblePlaces.length === 0 && <p className="nightlife-empty-state">No places match these filters. Try clearing a filter.</p>}
        </div>
      </section>

      {filtersOpen && (
        <div className="nightlife-filter-modal-backdrop" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) setFiltersOpen(false); }}>
          <section className="nightlife-filter-modal" role="dialog" aria-modal="true" aria-labelledby="nightlife-filter-title">
            <header className="nightlife-filter-modal-header">
              <h2 id="nightlife-filter-title">Filters</h2>
              <button type="button" className="nightlife-filter-close" onClick={() => setFiltersOpen(false)} aria-label="Close filters">×</button>
            </header>

            <div className="nightlife-filter-modal-body">
              <nav className="nightlife-filter-sidebar" aria-label="Filter categories">
                {nightlifeFilterTabs.map((tab) => (
                  <button key={tab} type="button" className={`nightlife-filter-tab${activeFilterTab === tab ? " active" : ""}`} onClick={() => setActiveFilterTab(tab)}>
                    {tab}
                    {tab === "Cuisines" && draftCuisines.length > 0 && <span className="nightlife-filter-count">{draftCuisines.length}</span>}
                  </button>
                ))}
              </nav>

              <div className="nightlife-filter-options">
                {activeFilterTab === "Sort by" && (
                  <div className="nightlife-filter-radio-list">
                    {nightlifeSortOptions.map((option) => (
                      <label key={option} className="nightlife-filter-choice">
                        <input type="radio" name="nightlife-sort" value={option} checked={draftSort === option} onChange={() => setDraftSort(option)} />
                        <span>{option}</span>
                      </label>
                    ))}
                    <p className="nightlife-filter-note">Distance sorting uses sample distances for this project, not live navigation.</p>
                  </div>
                )}

                {activeFilterTab === "Cuisines" && (
                  <div className="nightlife-filter-checkbox-list">
                    {nightlifeCuisineOptions.map((option) => (
                      <label key={option} className="nightlife-filter-choice">
                        <input type="checkbox" checked={draftCuisines.includes(option)} onChange={() => toggleItem(draftCuisines, setDraftCuisines, option)} />
                        <span>{option}</span>
                      </label>
                    ))}
                  </div>
                )}

                {activeFilterTab === "Rating" && (
                  <div className="nightlife-filter-radio-list">
                    {nightlifeRatingOptions.map((option) => (
                      <label key={option} className="nightlife-filter-choice">
                        <input type="radio" name="nightlife-rating-filter" checked={draftRating === option} onChange={() => setDraftRating(option)} />
                        <span>{option === "Any rating" ? option : `Rating: ${option}`}</span>
                      </label>
                    ))}
                  </div>
                )}

                {activeFilterTab === "Cost for two" && (
                  <div className="nightlife-filter-radio-list">
                    {nightlifeCostOptions.map((option) => (
                      <label key={option} className="nightlife-filter-choice">
                        <input type="radio" name="nightlife-cost-filter" checked={draftCost === option} onChange={() => setDraftCost(option)} />
                        <span>{option}</span>
                      </label>
                    ))}
                    <p className="nightlife-filter-note">The existing project data mixes per-person and per-two prices, so these ranges use the listed amount as a demo estimate.</p>
                  </div>
                )}

                {activeFilterTab === "More filters" && (
                  <div className="nightlife-filter-checkbox-list">
                    {nightlifeMoreOptions.map((option) => (
                      <label key={option} className="nightlife-filter-choice">
                        <input type="checkbox" checked={draftMore.includes(option)} onChange={() => toggleItem(draftMore, setDraftMore, option)} />
                        <span>{option}</span>
                      </label>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <footer className="nightlife-filter-modal-footer">
              <button type="button" className="nightlife-filter-clear" onClick={clearAllFilters}>Clear all</button>
              <button type="button" className="nightlife-filter-apply" onClick={applyModalFilters}>Apply</button>
            </footer>
          </section>
        </div>
      )}
    </main>
  );
}

export default Nightlife;
