/**
 * Fetch company tickers.
 *
 * @returns {Promise<any>} - A promise that resolves to the company tickers.
 */
export async function fetchCompanyTickers(): Promise<any> {
  const url = 'https://www.sec.gov/files/company_tickers_exchange.json';
  
  const headers = {
    'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
    'Sec-Fetch-Site': 'none',
    'Cookie': 'bm_sv=22A9D2B5A14304F61706C74C81E1F28A~YAAQf4YUAjda/UyZAQAAk2y6lB03howMt9NmGt5LwPQVId9fm+rvkESK/k8qi4BC51UVCZIV/+6/X/ICAPk/kOiFxMXKN3Q9iDRtDkVBtdWjU2OgYxEFspm5iQ1hviT3nmQJSfdqDhTtRWqiwyINAZjKrinezVYGNyq/jZjx4+3E4M070SDQ2dcW2OnGSLzfKGdVqXubl8N7oADR0FmOG1QgNf74auFDNlgv2DSNar9gUOaINE3E+tda8jdw~1; ak_bmsc=FF5D5B92BA38C54B03CD87FC5264A837~000000000000000000000000000000~YAAQf4YUAlxB/UyZAQAAczG3lB3L/ltcY/i655liF4vZO+PQDRQo9ygF5prcT80V4k5iS5dOYs6P7hCpF07zNGpjYXhLmU8RbAnGYPrtEREaONZoBV5Y10jD/f1tGPZkZMfivswhJTV6fzVJpuL4jKb1QiO7TRKM5JB9PkFY9g5u0daV3JVNu69zBeTbJuesh9/XfFEPIInE/skzwUTkRKPQaVZ2xSxPVCA04JoLN9SrHj+bLStEgtZwpOfNytz4TK8eqHg+iun36nmIDsTmDlmGYqp4UK0K5rsSMCOrFHaEtqEZeZH0Bv2qgStSmr1qzeNSKLBMhfHj9GKEE2PbHP9Ji7WocBMz7i9UCX29OI9lOtUlaCWtQeK7IpxFmFRzYlYiGNhNP8JYAQ==; bm_sv=22A9D2B5A14304F61706C74C81E1F28A~YAAQf4YUAtVd/UyZAQAArtm6lB0m/uTNzzmf0Ie8YtjhbJ77Q1U0JJlq9k4QTiKRErL+nKru76ahMBmCZMY9VOBPiMCWvpzhFo8bAJ+YBykvh6Qn2+82cvS3Y8EK4iKpZ2L/eVhxjzfuq8WlAv95PHFtKZ/xDzv4tKsQy8xcoYwakpPVKgdwpJRrqfs7BTZI4F2/Wz8jHjCOPRi/vJF5SJkZXLGGtR2tYBN74eODroKMDqjHfQaq4Dvhil1A~1',
    'Accept-Encoding': 'gzip, deflate, br',
    'Sec-Fetch-Mode': 'navigate',
    'Host': 'www.sec.gov',
    'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/18.6 Safari/605.1.15',
    'Accept-Language': 'en-GB,en-US;q=0.9,en;q=0.8',
    'Sec-Fetch-Dest': 'document',
    'Connection': 'keep-alive'
  };

  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: headers
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching company tickers:', error);
    throw error;
  }
}