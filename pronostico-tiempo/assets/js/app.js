/**
 * ⚡ CLIMA APP - JavaScript Core
 * Autor: Tu Profesor Antigravity 🚀
 */

document.addEventListener('DOMContentLoaded', () => {
    // 🧱 Selectores de elementos
    const cityInput = document.getElementById('cityInput');
    const searchBtn = document.getElementById('searchBtn');
    const geoBtn = document.getElementById('geoBtn');
    const weatherContent = document.getElementById('weatherContent');
    const loadingState = document.getElementById('loadingState');

    // 🔑 Configuración inicial: Intenta localizar al usuario al cargar
    initApp();

    // 🚀 Eventos
    searchBtn.addEventListener('click', () => searchCity(cityInput.value));
    cityInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') searchCity(cityInput.value);
    });
    geoBtn.addEventListener('click', getUserLocation);

    /**
     * 🏁 Inicializa la aplicación
     */
    function initApp() {
        console.log("🌟 Cargando App de Clima...");
        getUserLocation();
    }

    /**
     * 📍 Obtiene la ubicación del usuario mediante el navegador
     */
    function getUserLocation() {
        showLoading(true);
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const { latitude, longitude } = position.coords;
                    getWeatherData(latitude, longitude, "Tu ubicación actual");
                },
                (error) => {
                    console.error("❌ Error de geolocalización:", error);
                    showError("No pudimos obtener tu ubicación. ¡Busca una ciudad arriba! 🔍");
                    showLoading(false);
                }
            );
        } else {
            showError("Tu navegador no soporta geolocalización. 🛰️");
            showLoading(false);
        }
    }

    /**
     * 🔍 Busca una ciudad y obtiene sus coordenadas (Geocoding)
     */
    async function searchCity(city) {
        if (!city) return;
        showLoading(true);
        try {
            // Usamos Nominatim (OpenStreetMap) para geocodificación gratuita
            const response = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(city)}`);
            const data = await response.json();

            if (data.length > 0) {
                const { lat, lon, display_name } = data[0];
                getWeatherData(lat, lon, display_name);
            } else {
                showError("No encontramos esa ciudad. ¡Prueba otra! 🏙️");
                showLoading(false);
            }
        } catch (error) {
            console.error("❌ Error en Geocoding:", error);
            showError("Hubo un problema al buscar la ciudad. 🌐");
            showLoading(false);
        }
    }

    /**
     * 🌤️ Obtiene los datos del clima desde la API de Open-Meteo
     */
    async function getWeatherData(lat, lon, locationName) {
        try {
            const response = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true&hourly=temperature_2m,relativehumidity_2m,windspeed_10m&timezone=auto`);
            const data = await response.json();

            displayWeather(data.current_weather, locationName);
        } catch (error) {
            console.error("❌ Error en API del Clima:", error);
            showError("No pudimos obtener los datos del clima. 🌪️");
        } finally {
            showLoading(false);
        }
    }

    /**
     * 🖼️ Muestra los datos en la interfaz
     */
    function displayWeather(weather, location) {
        // Mapeo básico de iconos según el código de clima (WMO)
        const weatherIcons = {
            0: 'fa-sun', // Soleado
            1: 'fa-cloud-sun', // Mayormente despejado
            2: 'fa-cloud', // Nublado
            3: 'fa-cloud', // Nublado
            45: 'fa-smog', // Niebla
            48: 'fa-smog', 
            51: 'fa-cloud-rain', // Llovizna
            61: 'fa-cloud-showers-heavy', // Lluvia
            71: 'fa-snowflake', // Nieve
            95: 'fa-bolt' // Tormenta
        };

        const iconClass = weatherIcons[weather.weathercode] || 'fa-cloud-sun';
        
        // Limpiamos el nombre de la localidad si es muy largo
        const shortLocation = location.split(',')[0];

        weatherContent.innerHTML = `
            <div class="animate-fade-in text-center">
                <h2 class="text-2xl font-bold mb-2 flex items-center justify-center gap-2">
                    <i class="fas fa-map-marker-alt text-indigo-400"></i>
                    ${shortLocation}
                </h2>
                <div class="text-7xl mb-6 mt-4">
                    <i class="fas ${iconClass} text-yellow-400 drop-shadow-lg"></i>
                </div>
                <div class="temp-text text-8xl mb-4">
                    ${Math.round(weather.temperature)}°C
                </div>
                <div class="grid grid-cols-2 gap-4 mt-8">
                    <div class="glass-card p-4 rounded-2xl">
                        <p class="text-gray-400 text-sm uppercase">Viento</p>
                        <p class="text-xl font-semibold">${weather.windspeed} km/h</p>
                    </div>
                    <div class="glass-card p-4 rounded-2xl">
                        <p class="text-gray-400 text-sm uppercase">Dirección</p>
                        <p class="text-xl font-semibold">${weather.winddirection}°</p>
                    </div>
                </div>
                <p class="text-gray-500 mt-6 text-sm italic">
                    Actualizado: ${new Date().toLocaleTimeString()}
                </p>
            </div>
        `;
        weatherContent.classList.remove('hidden');
    }

    /**
     * 🔄 Gestiona el estado de carga
     */
    function showLoading(isLoading) {
        if (isLoading) {
            loadingState.classList.remove('hidden');
            weatherContent.classList.add('hidden');
        } else {
            loadingState.classList.add('hidden');
        }
    }

    /**
     * ⚠️ Muestra mensajes de error
     */
    function showError(message) {
        weatherContent.innerHTML = `
            <div class="text-center p-6 bg-red-500/20 rounded-2xl border border-red-500/30">
                <i class="fas fa-exclamation-triangle text-red-400 text-4xl mb-3"></i>
                <p class="font-medium text-red-200">${message}</p>
            </div>
        `;
        weatherContent.classList.remove('hidden');
    }
});
