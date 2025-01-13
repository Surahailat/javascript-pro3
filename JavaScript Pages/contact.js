const textarea = document.querySelector('textarea[name="message"]');
const submitButton = document.querySelector('button[type="submit"]'); // حدد زر الإرسال
const charCounter = document.createElement('p');

// إعدادات عداد الأحرف
charCounter.textContent = 'Remaining letters: 200';
charCounter.style.fontSize = '12px';
charCounter.style.color = '#555';

// أضف العداد قبل زر الإرسال
submitButton.parentNode.insertBefore(charCounter, submitButton);

textarea.addEventListener('input', function () {
    const maxChars = 200;
    const remainingChars = maxChars - this.value.length;
    charCounter.textContent = `Remaining letters: ${remainingChars}`;
    if (remainingChars < 0) {
        charCounter.style.color = 'red';
    } else {
        charCounter.style.color = '#555';
    }
});





document.querySelector('form').addEventListener('submit', function (e) {
    e.preventDefault();
    const successMessage = document.createElement('p');
    successMessage.textContent = 'Your message has been sent successfully!';
    successMessage.style.color = 'green';
    successMessage.style.marginTop = '10px';
    this.appendChild(successMessage);

    setTimeout(() => successMessage.remove(), 3000); 
});


