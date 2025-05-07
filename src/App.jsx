// This is an improved implementation of an AI-powered contract generator using React + Vite + Material UI
// File: src/App.jsx

import React, { useState, useEffect } from 'react';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';
import { 
  ThemeProvider, 
  createTheme, 
  CssBaseline,
  Container,
  Typography,
  Box,
  Paper,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Button,
  CircularProgress,
  Snackbar,
  Alert,
  Grid,
  InputAdornment,
  Divider,
  useMediaQuery
} from '@mui/material';
import { 
  Description as DescriptionIcon,
  Download as DownloadIcon,
  ArrowBack as ArrowBackIcon,
  AttachMoney as MoneyIcon
} from '@mui/icons-material';

// Create a royal green theme
const theme = createTheme({
  palette: {
    primary: {
      main: '#1B5E20', // Dark green
      light: '#43A047', // Light green
      dark: '#003300', // Very dark green
      contrastText: '#FFFFFF',
    },
    secondary: {
      main: '#2E7D32', // Another green shade
      light: '#60AD5E',
      dark: '#005005',
      contrastText: '#FFFFFF',
    },
    background: {
      default: '#F5F9F6', // Light green tinted background
      paper: '#FFFFFF',
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontWeight: 500,
    },
    h4: {
      fontWeight: 500,
    }
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          textTransform: 'none',
          padding: '10px 24px',
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          boxShadow: '0 4px 20px 0 rgba(0,0,0,0.1)',
        },
      },
    },
  },
});

function App() {
  const [step, setStep] = useState(1);
  const [summary, setSummary] = useState('');
  const [contractType, setContractType] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedContract, setGeneratedContract] = useState('');
  const [downloadSuccess, setDownloadSuccess] = useState(false);
  const [editableFields, setEditableFields] = useState({
    amount: '',
    startDate: '',
    party1: '',
    party2: '',
    address: '',
    term: '12',
    notice: '30',
  });
  
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  // Update editable fields when contract changes
  useEffect(() => {
    if (generatedContract) {
      // Extract the placeholder values from the contract content
      const extractValue = (regex, defaultValue) => {
        const match = generatedContract.match(regex);
        return match ? match[1] : defaultValue;
      };
      
      // We'll populate with values extracted from the contract or defaults
      const newFields = {
        amount: extractValue(/Total Monthly Rent: \$?(\[Amount\])/i, '') || 
                extractValue(/Annual Salary: \$?(\[Amount\])/i, '') || 
                extractValue(/Service Fee: \$?(\[Amount\])/i, '') || 
                extractValue(/purchase price for the goods is \$?(\[Amount\])/i, '') ||
                extractValue(/Total compensation: \$?(\[Amount\])/i, '') || '',
        startDate: extractValue(/begins on (\[Start Date\])/i, ''),
        party1: extractValue(/between (.*?) and/i, 'Party A'),
        party2: extractValue(/and (.*?)(,| -)/i, 'Party B'),
        address: '[Property Address]',
        term: '12',
        notice: '30',
      };
      
      setEditableFields(newFields);
    }
  }, [generatedContract]);

  // Sample contract types
  const contractTypes = [
    { id: 'roommate', name: 'Roommate Agreement' },
    { id: 'rental', name: 'Rental Agreement' },
    { id: 'employment', name: 'Employment Contract' },
    { id: 'service', name: 'Service Agreement' },
    { id: 'nda', name: 'Non-Disclosure Agreement' },
    { id: 'sales', name: 'Sales Contract' },
    { id: 'other', name: 'Other Contract Type' }
  ];

  // This function simulates AI generating a contract
  const generateContractWithAI = async (summary, contractType) => {
    setIsGenerating(true);
    
    // In a real app, this would be an API call to a service like OpenAI
    return new Promise((resolve) => {
      setTimeout(() => {
        // Extract key information from the summary
        const today = new Date().toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'long',
          day: 'numeric'
        });
        
        // Look for names in the summary
        const nameRegex = /(?:between|with|and)\s+([A-Z][a-z]+(?:\s+[A-Z][a-z]+)*)/g;
        const matches = [...(summary.matchAll(nameRegex) || [])];
        const party1 = matches?.[0]?.[1] || 'Party A';
        const party2 = matches?.[1]?.[1] || 'Party B';
        
        // Extract money amounts, if any
        const moneyRegex = /\$(\d+(?:,\d+)*(?:\.\d+)?)/g;
        const moneyMatches = [...(summary.matchAll(moneyRegex) || [])];
        const amount = moneyMatches?.[0]?.[1] || '[Amount]';
        
        // Extract dates, if any
        const dateRegex = /(?:on|by|starting|from)\s+(\w+\s+\d{1,2}(?:st|nd|rd|th)?,?\s+\d{4})/g;
        const dateMatches = [...(summary.matchAll(dateRegex) || [])];
        const startDate = dateMatches?.[0]?.[1] || '[Start Date]';
        
        let contract = '';
        
        // Generate contract based on type
        if (contractType === 'roommate') {
          contract = `
# ROOMMATE AGREEMENT

**Date:** ${today}

## 1. PARTIES

This Roommate Agreement ("Agreement") is made between ${party1} and ${party2}, collectively referred to as "Roommates."

## 2. PROPERTY

The Roommates agree to share the residential property located at [Property Address].

## 3. TERM

This Agreement begins on ${startDate} and continues for [Term] months, unless terminated as provided herein.

## 4. RENT AND EXPENSES

- Total Monthly Rent: $${amount}
- ${party1}'s Share: [Amount]
- ${party2}'s Share: [Amount]
- Security Deposit: [Amount]

## 5. HOUSE RULES

### 5.1 Overnight Guests
Roommates agree to discuss and approve overnight guests in advance.

### 5.2 Quiet Hours
Roommates agree to maintain reasonable noise levels and respect each other's study/sleep schedules.

### 5.3 Cleaning and Maintenance
Roommates agree to share cleaning responsibilities equally and maintain common areas in a clean and organized condition.

## 6. CONFLICT RESOLUTION

Roommates agree to address conflicts directly and respectfully. If an issue cannot be resolved between Roommates, they agree to seek mediation before taking any legal action.

## 7. TERMINATION

Either Roommate may terminate this Agreement with at least [Notice Period] days' written notice to the other Roommate.

## 8. SIGNATURES

${party1} - Date: ______________

${party2} - Date: ______________
`;
        } else if (contractType === 'employment') {
          contract = `
# EMPLOYMENT CONTRACT

**Date:** ${today}

## 1. PARTIES

This Employment Contract ("Contract") is made between ${party1} ("Employer") and ${party2} ("Employee").

## 2. POSITION

Employee is hired for the position of [Job Title].

## 3. TERM

Employment begins on ${startDate} and continues until terminated by either party as provided herein.

## 4. WORKING HOURS

Employee will work according to the schedule determined by the Employer.

## 5. COMPENSATION

- Annual Salary: $${amount}
- Pay Frequency: [Frequency]
- Benefits: As per company policy.

## 6. TERMINATION

Either party may terminate this Contract with appropriate notice as required by applicable law.

## 7. CONFIDENTIALITY

Employee agrees to maintain confidentiality of all proprietary information obtained during employment.

## 8. SIGNATURES

${party1} ("Employer") - Date: ______________

${party2} ("Employee") - Date: ______________
`;
        } else if (contractType === 'service') {
          contract = `
# SERVICE AGREEMENT

**Date:** ${today}

## 1. PARTIES

This Service Agreement ("Agreement") is made between ${party1} ("Client") and ${party2} ("Provider").

## 2. SERVICES

Provider agrees to provide the following services to Client:
[Service Description]

## 3. DELIVERABLES

Provider shall deliver:
[List of Deliverables]

## 4. TIMELINE

Project timeline:
Starting on ${startDate} and ending on [End Date].

## 5. COMPENSATION

- Service Fee: $${amount}
- Payment Schedule: [Payment Schedule]
- Late Payment Fees: Late payments may incur additional fees as allowed by law.

## 6. TERM AND TERMINATION

This Agreement remains in effect until services are completed or terminated by either party with [Notice Period] days written notice.

## 7. SIGNATURES

${party1} ("Client") - Date: ______________

${party2} ("Provider") - Date: ______________
`;
        } else if (contractType === 'rental') {
          contract = `
# RENTAL AGREEMENT

**Date:** ${today}

## 1. PARTIES

This Rental Agreement ("Agreement") is made between ${party1} ("Landlord") and ${party2} ("Tenant").

## 2. PROPERTY

The Landlord agrees to rent to the Tenant the property located at [Property Address].

## 3. TERM

This Agreement begins on ${startDate} and continues for [Term] months, unless terminated as provided herein.

## 4. RENT AND DEPOSITS

- Monthly Rent: $${amount}
- Security Deposit: [Amount]
- Pet Deposit (if applicable): [Amount]

## 5. UTILITIES AND SERVICES

The following utilities and services are included in the rent:
[List of included utilities]

The Tenant is responsible for paying for:
[List of tenant's responsibilities]

## 6. MAINTENANCE AND REPAIRS

The Landlord is responsible for maintaining the property in a habitable condition. The Tenant agrees to promptly notify the Landlord of any necessary repairs.

## 7. TERMINATION

Either party may terminate this Agreement with at least [Notice Period] days' written notice.

## 8. SIGNATURES

${party1} ("Landlord") - Date: ______________

${party2} ("Tenant") - Date: ______________
`;
        } else if (contractType === 'nda') {
          contract = `
# NON-DISCLOSURE AGREEMENT

**Date:** ${today}

## 1. PARTIES

This Non-Disclosure Agreement ("Agreement") is made between ${party1} ("Disclosing Party") and ${party2} ("Receiving Party").

## 2. PURPOSE

The purpose of this Agreement is to protect the confidential information that may be disclosed between the parties for the purpose of [Business Purpose].

## 3. CONFIDENTIAL INFORMATION

"Confidential Information" means any information disclosed by the Disclosing Party to the Receiving Party, either directly or indirectly, in writing, orally, or by inspection of tangible objects.

## 4. OBLIGATIONS

The Receiving Party shall:
- Maintain the confidentiality of the Confidential Information
- Not disclose the Confidential Information to any third party
- Use the Confidential Information only for the stated purpose
- Take reasonable measures to protect the secrecy of the Confidential Information

## 5. TERM

This Agreement shall remain in effect for [Term] years from the date of execution.

## 6. SIGNATURES

${party1} ("Disclosing Party") - Date: ______________

${party2} ("Receiving Party") - Date: ______________
`;
        } else if (contractType === 'sales') {
          contract = `
# SALES CONTRACT

**Date:** ${today}

## 1. PARTIES

This Sales Contract ("Contract") is made between ${party1} ("Seller") and ${party2} ("Buyer").

## 2. GOODS

The Seller agrees to sell and the Buyer agrees to purchase the following goods:
[Description of Goods]

## 3. PURCHASE PRICE

The purchase price for the goods is $${amount}.

## 4. PAYMENT TERMS

Payment shall be made as follows:
[Payment Terms]

## 5. DELIVERY

The goods shall be delivered to [Delivery Address] on or before [Delivery Date].

## 6. WARRANTIES

The Seller warrants that the goods are free from defects in materials and workmanship for a period of [Warranty Period].

## 7. SIGNATURES

${party1} ("Seller") - Date: ______________

${party2} ("Buyer") - Date: ______________
`;
        } else {
          // Generic contract for "other" type
          contract = `
# CONTRACT AGREEMENT

**Date:** ${today}

## 1. PARTIES

This Agreement is made between ${party1} and ${party2}.

## 2. PURPOSE

This Agreement is for the purpose of [Purpose].

## 3. TERM

This Agreement begins on ${startDate} and continues until [End Date], unless terminated earlier as provided herein.

## 4. TERMS AND CONDITIONS

[Terms and conditions based on the agreement summary]

## 5. COMPENSATION

Total compensation: $${amount}

## 6. TERMINATION

This Agreement may be terminated by either party with [Notice Period] days' written notice.

## 7. SIGNATURES

${party1} - Date: ______________

${party2} - Date: ______________
`;
        }
        
        setIsGenerating(false);
        resolve(contract);
      }, 1500); // Simulate API delay
    });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (!summary.trim() || !contractType) {
      return;
    }
    
    const contract = await generateContractWithAI(summary, contractType);
    setGeneratedContract(contract);
    setStep(2);
  };

  const updateContract = (field, value) => {
    let updatedContract = generatedContract;
    
    // Update the editable fields state
    setEditableFields(prev => ({
      ...prev,
      [field]: value
    }));
    
    // Update the contract text based on the field
    switch (field) {
      case 'amount':
        // Replace amount placeholders
        updatedContract = updatedContract.replace(/Total Monthly Rent: \$(\[Amount\])/g, `Total Monthly Rent: $${value}`);
        updatedContract = updatedContract.replace(/Annual Salary: \$(\[Amount\])/g, `Annual Salary: $${value}`);
        updatedContract = updatedContract.replace(/Service Fee: \$(\[Amount\])/g, `Service Fee: $${value}`);
        updatedContract = updatedContract.replace(/purchase price for the goods is \$(\[Amount\])/g, `purchase price for the goods is $${value}`);
        updatedContract = updatedContract.replace(/Total compensation: \$(\[Amount\])/g, `Total compensation: $${value}`);
        break;
      case 'startDate':
        updatedContract = updatedContract.replace(/begins on (\[Start Date\])/g, `begins on ${value}`);
        break;
      case 'party1':
        // This is more complex as we need to keep any role designations
        const party1Regex = new RegExp(`between (.*?) and`, 'g');
        updatedContract = updatedContract.replace(party1Regex, `between ${value} and`);
        break;
      case 'party2':
        const party2Regex = new RegExp(`and (.*?)(?:,| -)`, 'g');
        updatedContract = updatedContract.replace(party2Regex, `and ${value}$1`);
        break;
      case 'address':
        updatedContract = updatedContract.replace(/\[Property Address\]/g, value);
        break;
      case 'term':
        updatedContract = updatedContract.replace(/\[Term\]/g, value);
        break;
      case 'notice':
        updatedContract = updatedContract.replace(/\[Notice Period\]/g, value);
        break;
      default:
        break;
    }
    
    setGeneratedContract(updatedContract);
  };

  const downloadPDF = async () => {
    try {
      const element = document.getElementById('contract-content');
      const canvas = await html2canvas(element);
      const imgData = canvas.toDataURL('image/png');
      
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4'
      });
      
      const imgProps = pdf.getImageProperties(imgData);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
      
      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
      pdf.save('contract.pdf');
      
      setDownloadSuccess(true);
      setTimeout(() => setDownloadSuccess(false), 3000);
    } catch (error) {
      console.error("Error generating PDF:", error);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box
        sx={{
          minHeight: '100vh',
          backgroundColor: 'background.default',
          display: 'flex',
          flexDirection: 'column'
        }}
      >
        <Box
          sx={{
            backgroundColor: 'primary.main',
            color: 'primary.contrastText',
            py: 3,
            textAlign: 'center',
            boxShadow: 3
          }}
        >
          <Container>
            <Typography variant="h4" component="h1" gutterBottom>
              AI-Powered Contract Generator
            </Typography>
            <Typography variant="subtitle1">
              Generate professional legal contracts with a simple summary
            </Typography>
          </Container>
        </Box>

        <Container maxWidth="lg" sx={{ mt: 4, mb: 4, flexGrow: 1, position: 'relative' }}>
          {step === 1 ? (
            <Paper elevation={3} sx={{ p: 4 }}>
              <Box component="form" onSubmit={handleFormSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                <FormControl fullWidth required>
                  <InputLabel id="contract-type-label">Select Contract Type</InputLabel>
                  <Select
                    labelId="contract-type-label"
                    id="contract-type"
                    value={contractType}
                    label="Select Contract Type"
                    onChange={(e) => setContractType(e.target.value)}
                  >
                    {contractTypes.map(type => (
                      <MenuItem key={type.id} value={type.id}>{type.name}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
                
                <TextField
                  id="summary"
                  label="Describe your agreement"
                  multiline
                  rows={6}
                  value={summary}
                  onChange={(e) => setSummary(e.target.value)}
                  placeholder="Example: I need a roommate agreement between John Smith and Jane Doe for a rental property. The monthly rent is $1500 starting on January 1st, 2026."
                  helperText="Include details like parties involved, amounts, dates, and any specific terms."
                  required
                  fullWidth
                />
                
                <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                  <Button
                    type="submit"
                    variant="contained"
                    size="large"
                    disabled={isGenerating}
                    startIcon={isGenerating ? <CircularProgress size={20} color="inherit" /> : <DescriptionIcon />}
                  >
                    {isGenerating ? 'Generating...' : 'Generate Contract'}
                  </Button>
                </Box>
              </Box>
            </Paper>
          ) : (
            <Grid container spacing={3}>
              {/* Editable Fields Panel */}
              <Grid item xs={12} md={3}>
                <Paper elevation={3} sx={{ p: 3 }}>
                  <Typography variant="h6" gutterBottom>
                    Edit Contract Details
                  </Typography>
                  <Divider sx={{ mb: 2 }} />
                  
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                    <TextField
                      label="Amount"
                      value={editableFields.amount}
                      onChange={(e) => updateContract('amount', e.target.value)}
                      size="small"
                      InputProps={{
                        startAdornment: <InputAdornment position="start">$</InputAdornment>,
                      }}
                    />
                    
                    <TextField
                      label="Start Date"
                      value={editableFields.startDate}
                      onChange={(e) => updateContract('startDate', e.target.value)}
                      size="small"
                      placeholder="e.g. January 1, 2026"
                    />
                    
                    <TextField
                      label="Party 1"
                      value={editableFields.party1}
                      onChange={(e) => updateContract('party1', e.target.value)}
                      size="small"
                    />
                    
                    <TextField
                      label="Party 2"
                      value={editableFields.party2}
                      onChange={(e) => updateContract('party2', e.target.value)}
                      size="small"
                    />
                    
                    <TextField
                      label="Address"
                      value={editableFields.address}
                      onChange={(e) => updateContract('address', e.target.value)}
                      size="small"
                    />
                    
                    <TextField
                      label="Term (months)"
                      value={editableFields.term}
                      onChange={(e) => updateContract('term', e.target.value)}
                      size="small"
                      type="number"
                    />
                    
                    <TextField
                      label="Notice Period (days)"
                      value={editableFields.notice}
                      onChange={(e) => updateContract('notice', e.target.value)}
                      size="small"
                      type="number"
                    />
                  </Box>
                </Paper>
              </Grid>
              
              {/* Contract Preview */}
              <Grid item xs={12} md={9}>
                <Paper elevation={3} sx={{ p: { xs: 2, md: 4 }, mb: 3 }}>
                  <Box id="contract-content" sx={{ 
                    fontFamily: '"Times New Roman", Times, serif',
                    fontSize: '14px',
                    lineHeight: 1.6,
                    whiteSpace: 'pre-wrap',
                    '& h1': {
                      fontSize: '24px',
                      textAlign: 'center',
                      fontWeight: 'bold',
                      marginBottom: '1em'
                    },
                    '& h2': {
                      fontSize: '16px',
                      fontWeight: 'bold'
                    },
                    '& h3': {
                      fontSize: '14px',
                      fontWeight: 'bold'
                    },
                    '& strong': {
                      fontWeight: 'bold'
                    }
                  }}>
                    <div dangerouslySetInnerHTML={{ __html: generatedContract.replace(/\n/g, '<br />') }}></div>
                  </Box>
                </Paper>
                
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
                  <Button
                    onClick={() => setStep(1)}
                    variant="outlined"
                    startIcon={<ArrowBackIcon />}
                  >
                    Back to Editor
                  </Button>
                  <Button
                    onClick={downloadPDF}
                    variant="contained"
                    color="primary"
                    startIcon={<DownloadIcon />}
                  >
                    Download as PDF
                  </Button>
                </Box>
              </Grid>
            </Grid>
          )}
        </Container>
        
        <Box
          component="footer"
          sx={{
            py: 3,
            px: 2,
            mt: 'auto',
            backgroundColor: 'primary.dark',
            color: 'white',
            textAlign: 'center'
          }}
        >
          <Typography variant="body2">
            © {new Date().getFullYear()} AI-Powered Contract Generator
          </Typography>
        </Box>
      </Box>
      
      <Snackbar
        open={downloadSuccess}
        autoHideDuration={3000}
        onClose={() => setDownloadSuccess(false)}
      >
        <Alert onClose={() => setDownloadSuccess(false)} severity="success" sx={{ width: '100%' }}>
          Contract downloaded successfully!
        </Alert>
      </Snackbar>
    </ThemeProvider>
  );
}

export default App;