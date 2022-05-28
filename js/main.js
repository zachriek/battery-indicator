/*=============== BATTERY ===============*/
initBattery();

function initBattery() {
    const batteryLiquid = document.querySelector('.battery__liquid');
    const batteryStatus = document.querySelector('.battery__status');
    const batteryPercentage = document.querySelector('.battery__percentage');

    navigator.getBattery().then((batt) => {
        updateBattery = () => {
            /* 1. We update the number level of the battery */
            let level = Math.floor(batt.level * 100);
            batteryPercentage.textContent = `${level}%`;

            /* 2. We update the background level of the battery */
            batteryLiquid.style.height = `${parseInt(batt.level * 100)}%`;

            /* 3. We validate full battery, low battery and if it is charging or not */
            if (level == 100) {
                batteryStatus.innerHTML = `Full battery <i class="ri-battery-2-fill green-color"></i>`;
                batteryLiquid.style.height = '103%';
            } else if ((level <= 20) & !batt.charging) {
                batteryStatus.innerHTML = `Low battery <i class="ri-plug-line animated-red"></i>`;
            } else if (batt.charging) {
                batteryStatus.innerHTML = `Charging... <i class="ri-flashlight-line animated-green"></i>`;
            } else {
                batteryStatus.innerHTML = '';
            }

            /* 4. We change the colors of the battery and remove the other colors */
            if (level <= 20) {
                batteryLiquid.classList.add('gradient-color-red');
                batteryLiquid.classList.remove('gradient-color-orange', 'gradient-color-yellow', 'gradient-color-green');
            } else if (level <= 40) {
                batteryLiquid.classList.add('gradient-color-orange');
                batteryLiquid.classList.remove('gradient-color-red', 'gradient-color-yellow', 'gradient-color-green');
            } else if (level <= 80) {
                batteryLiquid.classList.add('gradient-color-yellow');
                batteryLiquid.classList.remove('gradient-color-red', 'gradient-color-orange', 'gradient-color-green');
            } else {
                batteryLiquid.classList.add('gradient-color-green');
                batteryLiquid.classList.remove('gradient-color-red', 'gradient-color-orange', 'gradient-color-yellow');
            }
        };

        updateBattery();

        batt.addEventListener('chargingchange', () => {
            updateBattery();
        });
        batt.addEventListener('levelchange', () => {
            updateBattery();
        });
    });
}
