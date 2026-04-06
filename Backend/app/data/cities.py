"""
Gujarat Cities — Base Climate Profiles

Each city has coordinates and baseline weather parameters used
to seed the data generator with regionally-accurate patterns.
"""

from typing import Dict, Any, List


# ──────────────────────────────────────────────────────────────
# Base climate profiles for each Gujarat city
#   base_temp     : Average annual temperature (°C)
#   base_humidity : Average annual relative humidity (%)
#   base_wind     : Average wind speed (km/h)
#   base_pressure : Average sea-level pressure (hPa)
#   base_aqi      : Baseline AQI (industrial/urban → higher)
#   temp_amplitude: Day-night temperature swing (°C)
# ──────────────────────────────────────────────────────────────

GUJARAT_CITIES: Dict[str, Dict[str, Any]] = {
    "Ahmedabad": {
        "lat": 23.0225, "lon": 72.5714,
        "base_temp": 30.0, "base_humidity": 42, "base_wind": 12,
        "base_pressure": 1012, "base_aqi": 140, "temp_amplitude": 8,
    },
    "Surat": {
        "lat": 21.1702, "lon": 72.8311,
        "base_temp": 29.5, "base_humidity": 65, "base_wind": 14,
        "base_pressure": 1013, "base_aqi": 110, "temp_amplitude": 6,
    },
    "Vadodara": {
        "lat": 22.3072, "lon": 73.1812,
        "base_temp": 29.0, "base_humidity": 48, "base_wind": 10,
        "base_pressure": 1012, "base_aqi": 125, "temp_amplitude": 7,
    },
    "Rajkot": {
        "lat": 22.3039, "lon": 70.8022,
        "base_temp": 28.5, "base_humidity": 40, "base_wind": 15,
        "base_pressure": 1013, "base_aqi": 100, "temp_amplitude": 9,
    },
    "Bhavnagar": {
        "lat": 21.7645, "lon": 72.1519,
        "base_temp": 28.0, "base_humidity": 58, "base_wind": 16,
        "base_pressure": 1013, "base_aqi": 90, "temp_amplitude": 7,
    },
    "Jamnagar": {
        "lat": 22.4707, "lon": 70.0577,
        "base_temp": 28.0, "base_humidity": 55, "base_wind": 18,
        "base_pressure": 1014, "base_aqi": 85, "temp_amplitude": 6,
    },
    "Junagadh": {
        "lat": 21.5222, "lon": 70.4579,
        "base_temp": 27.5, "base_humidity": 50, "base_wind": 12,
        "base_pressure": 1013, "base_aqi": 75, "temp_amplitude": 7,
    },
    "Gandhinagar": {
        "lat": 23.2156, "lon": 72.6369,
        "base_temp": 29.5, "base_humidity": 40, "base_wind": 11,
        "base_pressure": 1012, "base_aqi": 105, "temp_amplitude": 8,
    },
    "Bharuch": {
        "lat": 21.7051, "lon": 73.0033,
        "base_temp": 28.5, "base_humidity": 55, "base_wind": 13,
        "base_pressure": 1013, "base_aqi": 115, "temp_amplitude": 7,
    },
    "Nadiad": {
        "lat": 22.6939, "lon": 72.8616,
        "base_temp": 29.0, "base_humidity": 45, "base_wind": 10,
        "base_pressure": 1012, "base_aqi": 95, "temp_amplitude": 8,
    },
    "Valsad": {
        "lat": 20.6108, "lon": 72.9342,
        "base_temp": 27.5, "base_humidity": 70, "base_wind": 14,
        "base_pressure": 1013, "base_aqi": 80, "temp_amplitude": 5,
    },
    "Porbandar": {
        "lat": 21.6417, "lon": 69.6293,
        "base_temp": 27.0, "base_humidity": 65, "base_wind": 20,
        "base_pressure": 1014, "base_aqi": 60, "temp_amplitude": 5,
    },
    "Bhuj": {
        "lat": 23.2531, "lon": 69.6693,
        "base_temp": 29.0, "base_humidity": 35, "base_wind": 16,
        "base_pressure": 1012, "base_aqi": 90, "temp_amplitude": 10,
    },
    "Anand": {
        "lat": 22.5645, "lon": 72.9289,
        "base_temp": 29.0, "base_humidity": 45, "base_wind": 10,
        "base_pressure": 1012, "base_aqi": 90, "temp_amplitude": 7,
    },
    "Mehsana": {
        "lat": 23.5879, "lon": 72.3693,
        "base_temp": 28.5, "base_humidity": 38, "base_wind": 12,
        "base_pressure": 1012, "base_aqi": 100, "temp_amplitude": 9,
    },
    "Navsari": {
        "lat": 20.9467, "lon": 72.9520,
        "base_temp": 27.5, "base_humidity": 68, "base_wind": 13,
        "base_pressure": 1013, "base_aqi": 78, "temp_amplitude": 5,
    },
    "Patan": {
        "lat": 23.8506, "lon": 72.1296,
        "base_temp": 28.0, "base_humidity": 36, "base_wind": 14,
        "base_pressure": 1012, "base_aqi": 85, "temp_amplitude": 10,
    },
    "Morbi": {
        "lat": 22.8173, "lon": 70.8377,
        "base_temp": 28.5, "base_humidity": 40, "base_wind": 14,
        "base_pressure": 1013, "base_aqi": 130, "temp_amplitude": 9,
    },
    "Dahod": {
        "lat": 22.8420, "lon": 74.2555,
        "base_temp": 27.0, "base_humidity": 50, "base_wind": 8,
        "base_pressure": 1011, "base_aqi": 70, "temp_amplitude": 8,
    },
    "Amreli": {
        "lat": 21.6032, "lon": 71.2221,
        "base_temp": 28.0, "base_humidity": 45, "base_wind": 14,
        "base_pressure": 1013, "base_aqi": 75, "temp_amplitude": 8,
    },
    "Palanpur": {
        "lat": 24.1724, "lon": 72.4383,
        "base_temp": 27.5, "base_humidity": 35, "base_wind": 13,
        "base_pressure": 1012, "base_aqi": 80, "temp_amplitude": 10,
    },
    "Nargol": {
        "lat": 20.2304, "lon": 72.7684,
        "base_temp": 27.0, "base_humidity": 75, "base_wind": 15,
        "base_pressure": 1013, "base_aqi": 55, "temp_amplitude": 4,
    },
    "Daman": {
        "lat": 20.3974, "lon": 72.8328,
        "base_temp": 27.5, "base_humidity": 72, "base_wind": 16,
        "base_pressure": 1013, "base_aqi": 65, "temp_amplitude": 5,
    },
    "Banaskantha": {
        "lat": 24.3445, "lon": 72.2048,
        "base_temp": 27.0, "base_humidity": 32, "base_wind": 14,
        "base_pressure": 1012, "base_aqi": 75, "temp_amplitude": 11,
    },
    "Vapi": {
        "lat": 20.3710, "lon": 72.9049,
        "base_temp": 27.5, "base_humidity": 70, "base_wind": 13,
        "base_pressure": 1013, "base_aqi": 120, "temp_amplitude": 5,
    },
    "Dwarka": {
        "lat": 22.2394, "lon": 68.9678,
        "base_temp": 27.0, "base_humidity": 68, "base_wind": 22,
        "base_pressure": 1014, "base_aqi": 45, "temp_amplitude": 4,
    },
    "Gondal": {
        "lat": 21.9656, "lon": 70.8169,
        "base_temp": 28.0, "base_humidity": 42, "base_wind": 13,
        "base_pressure": 1013, "base_aqi": 80, "temp_amplitude": 8,
    },
    "Veraval": {
        "lat": 20.9160, "lon": 70.3646,
        "base_temp": 27.0, "base_humidity": 70, "base_wind": 19,
        "base_pressure": 1014, "base_aqi": 55, "temp_amplitude": 4,
    },
    "Godhra": {
        "lat": 22.7870, "lon": 73.6140,
        "base_temp": 28.0, "base_humidity": 48, "base_wind": 9,
        "base_pressure": 1012, "base_aqi": 85, "temp_amplitude": 8,
    },
    "Himatnagar": {
        "lat": 23.5977, "lon": 72.9636,
        "base_temp": 27.5, "base_humidity": 42, "base_wind": 10,
        "base_pressure": 1012, "base_aqi": 80, "temp_amplitude": 9,
    },
    "Surendranagar": {
        "lat": 22.7196, "lon": 71.6557,
        "base_temp": 28.5, "base_humidity": 38, "base_wind": 15,
        "base_pressure": 1012, "base_aqi": 90, "temp_amplitude": 10,
    },
    "Upleta": {
        "lat": 21.7875, "lon": 70.3265,
        "base_temp": 28.0, "base_humidity": 48, "base_wind": 14,
        "base_pressure": 1013, "base_aqi": 70, "temp_amplitude": 7,
    },
    "Wankaner": {
        "lat": 22.9990, "lon": 70.2210,
        "base_temp": 28.5, "base_humidity": 40, "base_wind": 14,
        "base_pressure": 1013, "base_aqi": 80, "temp_amplitude": 9,
    },
    "Chhota Udaipur": {
        "lat": 22.3550, "lon": 73.3920,
        "base_temp": 27.0, "base_humidity": 52, "base_wind": 8,
        "base_pressure": 1011, "base_aqi": 65, "temp_amplitude": 8,
    },
    "Savarkundla": {
        "lat": 21.1667, "lon": 71.9333,
        "base_temp": 28.0, "base_humidity": 48, "base_wind": 13,
        "base_pressure": 1013, "base_aqi": 72, "temp_amplitude": 7,
    },
}


def get_city_names() -> List[str]:
    """Return sorted list of all Gujarat city names."""
    return sorted(GUJARAT_CITIES.keys())


def get_city_profile(city: str) -> Dict[str, Any]:
    """Return the climate profile for a given city."""
    if city not in GUJARAT_CITIES:
        raise ValueError(
            f"Unknown city: {city}. Available: {', '.join(get_city_names())}"
        )
    return GUJARAT_CITIES[city]
