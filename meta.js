import express from 'express';
import axios from 'axios';
import fs from 'fs';
import mime from 'mime';

const app = express();
app.use(express.json());

const WHATSAPP_CLOUD_API_ACCESS_TOKEN = 'EAAKce3JFrqsBO5BuUjs7SUOTVqZCgCDxR7tSvqF2rIToQXWLLTEPZCznS5nhtu465rvaKCaY4rUCTYBMdy0LvszCZBV0zp2ArZBKD65H3gkRZCTQdmmDp4104LECE6YofylytMVvDJhGamfxTo0ruTuXgc168ZA16IpR3c6VWOQPunZA4ORsWiRfJRT3H87FyfYf79K8KgZAxj2j1kSw';
const CLOUD_API_PHONE_ID = '282507964952285';
const BASE_URL = 'https://graph.facebook.com/v17.0';

//enviar una solicitud HTTP a la API de WhatsApp Cloud
async function cloudApiCurl(url, replyData = null) {
    try {
        const config = {
            headers: {
                'Authorization': `Bearer ${WHATSAPP_CLOUD_API_ACCESS_TOKEN}`,
                'Content-Type': replyData ? 'application/json' : undefined
            }
        };

        if (replyData) {
            config.headers['Content-Length'] = Buffer.byteLength(JSON.stringify(replyData));
        }

        const response = await axios.post(url, replyData, config);
        return response.data;
    } catch (error) {
        console.error('Error in cloudApiCurl:', error.response ? error.response.data : error.message);
        return null;
    }
}

//obtener el tipo MIME de una imagen
function cloudApiImageMime(imagePath) {
    return mime.getType(imagePath);
}

//subir un archivo a la API de WhatsApp Cloud
async function cloudApiUploadFile(filePath) {
    const mime = cloudApiImageMime(filePath);
    const size = fs.statSync(filePath).size;

    const metaUrl = `${BASE_URL}/uploads?file_length=${size}&file_type=${mime}&access_token=${WHATSAPP_CLOUD_API_ACCESS_TOKEN}`;
    
    try {
        const metaResponse = await axios.post(metaUrl, {}, {
            headers: { 'Authorization': `Bearer ${WHATSAPP_CLOUD_API_ACCESS_TOKEN}` }
        });

        const sessionId = metaResponse.data.id;

        const uploadUrl = `${BASE_URL}/${sessionId}`;
        const fileData = fs.readFileSync(filePath);

        const uploadResponse = await axios.post(uploadUrl, fileData, {
            headers: {
                'Authorization': `OAuth ${WHATSAPP_CLOUD_API_ACCESS_TOKEN}`,
                'Content-Length': fileData.length,
                'Content-Type': mime
            }
        });

        return uploadResponse.data;
    } catch (error) {
        console.error('Error in cloudApiUploadFile:', error.response ? error.response.data : error.message);
        return null;
    }
}

//enviar un mensaje de texto
async function cloudApiSendTextMessage(cloudApiPhoneId, phone, message) {
    const url = `${BASE_URL}/${cloudApiPhoneId}/messages`;

    const replyData = {
        messaging_product: 'whatsapp',
        recipient_type: 'individual',
        to: phone,
        type: 'text',
        text: { body: message }
    };

    return await cloudApiCurl(url, replyData);
}

// Ruta para enviar un mensaje de texto
app.post('/send-text', async (req, res) => {
    const { phone, message } = req.body;
    console.log(`Sending message to ${phone}: ${message}`);
    
    const response = await cloudApiSendTextMessage(CLOUD_API_PHONE_ID, phone, message);
    if (response) {
        console.log('Message sent successfully:', response);
        res.json({ success: true, response });
    } else {
        console.error('Failed to send message');
        res.status(500).json({ success: false, error: 'Failed to send message' });
    }
});


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
