document.addEventListener('DOMContentLoaded', function () {
    // ключ шифрования
    const SECRET_KEY = "mySecretKey123";

    // элемент интерфейса куда вставляем результат дешифрования
    const decryptedText = document.getElementById('decryptedText');

    function b64_to_utf8(str) {
        return decodeURIComponent(Array.prototype.map.call(atob(str), function (c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));
    }

    function simpleDecrypt(encoded) {
        try {
            // Декодируем из Base64 с поддержкой Unicode
            return b64_to_utf8(encoded);
        } catch (e) {
            console.error('Ошибка дешифрования:', e);
            return '';
        }
    }

    function checkUrlForEncryptedData() {
        const urlParams = new URLSearchParams(window.location.search);
        const encryptedData = urlParams.get('data');

        if (encryptedData) {
            try {
                // Декодируем URL-параметр
                const decodedData = decodeURIComponent(encryptedData);

                // Дешифруем текст
                const decryptedMessage = simpleDecrypt(decodedData);

                if (decryptedMessage) {
                    // Заполняем поле с зашифрованным текстом
                    decryptedText.textContent = decryptedMessage;
                }
            } catch (error) {
                console.error('Ошибка при автоматическом дешифровании:', error);
            }
        }
    }

    checkUrlForEncryptedData();
});