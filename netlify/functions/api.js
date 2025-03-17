require('dotenv').config();
const express = require('express');
const axios = require('axios');
const cors = require('cors');
const serverless = require('serverless-http');

const app = express();

app.use(cors());
app.use(express.json());

app.get('/', async (req, res) => {
  try {
    const allData = await fetchAllSenderEmails();
    res.json(allData);
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      error: error.message 
    });
  }
});

async function fetchAllSenderEmails() {
  const config = {
    apiEndpoint: 'https://send.borks.io/api/sender-emails',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${process.env.BORKS_API_KEY}`
    }
  };

  let allData = [];
  let nextPageUrl = config.apiEndpoint;
  let pageCount = 0;
  
  while (nextPageUrl) {
    console.log(`Fetching page ${++pageCount}...`);
    
    const response = await axios.get(nextPageUrl, {
      headers: config.headers
    });
    
    if (Array.isArray(response.data.data)) {
      allData = allData.concat(response.data.data);
      console.log(`Added ${response.data.data.length} records. Total: ${allData.length}`);
    }
    
    nextPageUrl = response.data.links && response.data.links.next ? response.data.links.next : null;
  }
  
  return {
    success: true,
    recordCount: allData.length,
    data: allData
  };
}

// Export the serverless function
module.exports.handler = serverless(app); 