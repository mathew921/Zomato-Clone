
import "./Location.css";

function Location({ onClose }) {
  return (
    <div className="location-overlay" onClick={onClose}>
      <div
        className="location-popup"
        onClick={(event) => event.stopPropagation()}
      >
        <button
          className="detect-location-btn"
          type="button"
          onClick={() => {
            if (!navigator.geolocation) {
              alert("Location detection is not supported.");
              return;
            }

            navigator.geolocation.getCurrentPosition(
              (position) => {
                alert(
                  `Latitude: ${position.coords.latitude}, Longitude: ${position.coords.longitude}`
                );
              },
              () => {
                alert("Unable to detect location. Please allow location access.");
              }
            );
          }}
        >
          <span className="detect-icon">⊙</span>
          <div>
            <h3>Detect current location</h3>
            <p>Using GPS</p>
          </div>
        </button>
      </div>
    </div>
  );
}

export default Location;
