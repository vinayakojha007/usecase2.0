//Pseudocode
// Set the constant API_KEY to the API key for authentication.
// Import the fs module for file system operations.
//  Define an array of prompts, each having a prompt message and a corresponding filename
// Function to generate responses using ChatGPT based on the prompts
// Loop through each prompt and generate a response
//  Prepare the API request options with the prompt, API key, and other parameters.
//  Send a POST request to the OpenAI API with the options.
//  Parse the response from the API into JSON format.
//  Check if the API response contains choices.
//  If choices exist, retrieve the content of the first choice.
//  Write the content to a file with the specified filename.
//  If there is an error writing the file, log the error.
//  If the file is written successfully, log a success message.
//  If no choices are found in the API response, log an error message.

const axios = require('axios');
const fs = require("fs");
const apiEndpoint = 'https://api.openai.com/v1/chat/completions';
const apiKey = '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';

const prompts = [
    {
      prompt: 'Generate the csv file for 3  employees for june month (30 days) and Marked the Weekend (Saturday and Sunday as 0) having Employee ID as (EMP001,...),Date (DD-MM-YYYY),Day,Time-in (8AM - 10AM),Time-out (5PM-8PM),Total Hours Worked(Hrs)',
      filename:'emp_att_june.csv'
    },
    {
      prompt: 'Generate the csv for employee leave having Employee ID as (EMP001,...),Employee Name,Leave Type(half day,full day),Start Date,End Date,Leave Duration,Leave Status (Approval Status like Approved or Rejected) for June month',
      filename:'emp_leave.csv',
    },
    {
      prompt: 'Generate the csv file for National holidays(as per India calendar)having Date as (DD-MM-YYYY),Day,Holiday Name,Type(Public)',
      filename:'emp_holiday.csv',
    },
    {
      prompt: "Generate the Attendance sheet for 3 employees for june month  in to csv format which contain  headers, Employee Name,Employee Id(EMP...),Total Working Day(Calculated),Total Working Hours(Calculated).excluding weekends, holidays, leaves and based on number of working days, each day 8 hours being working hours.",
      filename:"emp_result_june.csv"
    },
  ];
  

async function generateChatGPTResponses(prompts) {
  try {
    const headers = {
        Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
      
    };

    let cumulativeResponses = '';

    for (const prompt of prompts) {
        console.log(prompt);
      const body = {
        model: "gpt-3.5-turbo",
        messages: [
            {
              role: "user",
              content: prompt.prompt,
            },
          ],
        max_tokens: 3000,
        temperature: 0.2
      };

      const response = await axios.post(apiEndpoint, body, { headers });
      const generatedText = response.data.choices[0].message.content;

      fs.writeFileSync(prompt.filename, generatedText, 'utf8');

        console.log(`CSV file "${prompt.filename}" generated successfully.`);
    }

    return cumulativeResponses;
  } catch (error) {
    console.error('Error generating ChatGPT responses:', error.message);
    throw error;
  }
}


generateChatGPTResponses(prompts);

