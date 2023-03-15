const form = document.querySelector('#product-form');
const product_name = document.querySelector('#product-name');
const product_details = document.querySelector('#product-details');
const product_type = document.querySelector('#product-type');
const product_image = document.querySelector('#product-image');
const ai_product_description = document.querySelector('#ai-product-description');
const processed_image = document.querySelector('#processed-image');

form.addEventListener('submit', async (event) => {
  event.preventDefault();

  if (product_image.files.length > 0) {
    const imageFile = product_image.files[0];
    const photoroom_api_key = '1d0efc1d230df747a31e4455757913d4a39d43e5';
    const photoroom_url = 'https://sdk.photoroom.com/v1/segment';
    const formData = new FormData();
    formData.append('image_file', imageFile);

    try {
      const response = await fetch(photoroom_url, {
        method: 'POST',
        headers: { 'x-api-key': photoroom_api_key },
        body: formData,
      });

      const data = await response.json();
      const imageUrl = data.imageUrl;
      processed_image.src = imageUrl;
      processed_image.style.display = 'block';
    } catch (error) {
      console.log('Error removing background:', error);
    }
  }

  const prompt = `Generate a product description for ${product_name.value}, a ${product_type.value} that ${product_details.value}.`;
  const api_key = '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';
  const model = 'text-davinci-002';
  const url = `https://api.openai.com/v1/engines/${model}/completions`;
  const body = {
    prompt,
    max_tokens: 500,
    n: 1,
    stop: '.',
  };
  const headers = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${api_key}`,
  };

  fetch(url, {
    method: 'POST',
    body: JSON.stringify(body),
    headers: headers,
  })
    .then((response) => response.json())
    .then((data) => {
      const product_description = data.choices[0].text.trim();
      ai_product_description.textContent
