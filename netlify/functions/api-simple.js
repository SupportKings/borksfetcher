require('dotenv').config();
const axios = require('axios');

exports.handler = async function(event, context) {
  try {
    const allData = await fetchAllSenderEmails();
    
    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'GET'
      },
      body: JSON.stringify(allData)
    };
  } catch (error) {
    console.error('Error:', error);
    
    return {
      statusCode: 500,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'GET'
      },
      body: JSON.stringify({ 
        success: false, 
        error: error.message 
      })
    };
  }
};

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