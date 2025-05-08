import React, { useState } from 'react';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';
import { 
  ThemeProvider, 
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
  Info as InfoIcon
} from '@mui/icons-material';
import { contractTemplates, contractTypes } from './contractTemplates';
import { theme } from './styles';
import Instructions from './Instructions';
import "./App.css"

function App() {
  const [step, setStep] = useState(1);
  const [summary, setSummary] = useState('');
  const [contractType, setContractType] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedContract, setGeneratedContract] = useState('');
  const [downloadSuccess, setDownloadSuccess] = useState(false);
  const [showInstructions, setShowInstructions] = useState(false);
  const [contractData, setContractData] = useState({
    amount: '',
    startDate: '',
    party1: '',
    party2: '',
    address: '',
    term: '12',
    notice: '30',
    roommateCount: '2',
    today: new Date().toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  });
  
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const generateContractWithAI = async (summary, contractType) => {
    setIsGenerating(true);
    
    return new Promise((resolve) => {
      setTimeout(() => {
        // Extract key information from the summary
        const nameRegex = /(?:between|with|and)\s+([A-Z][a-z]+(?:\s+[A-Z][a-z]+)*)/g;
        const matches = [...(summary.matchAll(nameRegex) || [])];
        const party1 = matches?.[0]?.[1] || 'Party A';
        const party2 = matches?.[1]?.[1] || 'Party B';
        
        const moneyRegex = /\$(\d+(?:,\d+)*(?:\.\d+)?)/g;
        const moneyMatches = [...(summary.matchAll(moneyRegex) || [])];
        const amount = moneyMatches?.[0]?.[1] || '[Amount]';
        
        const dateRegex = /(?:on|by|starting|from)\s+(\w+\s+\d{1,2}(?:st|nd|rd|th)?,?\s+\d{4})/g;
        const dateMatches = [...(summary.matchAll(dateRegex) || [])];
        const startDate = dateMatches?.[0]?.[1] || '[Start Date]';
        
        // Calculate roommate shares if applicable
        let roommateCount = contractData.roommateCount;
        if (contractType === 'roommate' && amount && !isNaN(amount)) {
          roommateCount = summary.match(/between\s(\d+)\sroommates/i)?.[1] || contractData.roommateCount;
        }
        
        const newContractData = {
          ...contractData,
          amount,
          startDate,
          party1,
          party2,
          roommateCount,
          address: '[Property Address]'
        };
        
        setContractData(newContractData);
        const contract = contractTemplates[contractType](newContractData);
        
        setIsGenerating(false);
        resolve(contract);
      }, 1000);
    });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (!summary.trim() || !contractType) return;
    
    const contract = await generateContractWithAI(summary, contractType);
    setGeneratedContract(contract);
    setStep(2);
  };

  const updateContractData = (field, value) => {
    const updated = { ...contractData, [field]: value };
    setContractData(updated);
    const newContract = contractTemplates[contractType](updated);
    setGeneratedContract(newContract);
  };

  const downloadPDF = async () => {
    try {
      const element = document.getElementById('contract-content');
      
      // Create a clone of the element to modify and capture
      const clone = element.cloneNode(true);
      clone.style.width = '800px'; // Fixed width for consistent rendering
      clone.style.padding = '40px'; // Add padding for better margins
      clone.style.boxSizing = 'border-box';
      
      const tempContainer = document.createElement('div');
      tempContainer.style.position = 'absolute';
      tempContainer.style.left = '-9999px';
      tempContainer.style.top = '0';
      tempContainer.appendChild(clone);
      document.body.appendChild(tempContainer);
      
      // Calculate approximate page breaks
      const pageHeight = 1122; // A4 height in pixels at 96dpi (scale: 1)
      const scale = 2; // Higher scale for better quality
      const pages = Math.ceil(clone.scrollHeight / (pageHeight / scale));
      
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4'
      });
      
      for (let i = 0; i < pages; i++) {
        if (i > 0) {
          pdf.addPage();
        }
        
        const canvas = await html2canvas(clone, {
          scale: scale,
          windowHeight: pageHeight / scale,
          y: i * (pageHeight / scale),
          height: pageHeight / scale,
          width: clone.offsetWidth,
          useCORS: true,
          removeContainer: false,
          logging: false
        });
        
        const imgData = canvas.toDataURL('image/png');
        pdf.addImage(imgData, 'PNG', 10, 10, 190, 0, undefined, 'FAST');
      }
      
      document.body.removeChild(tempContainer);
      pdf.save(`${contractTypes.find(c => c.id === contractType).name}.pdf`);
      
      setDownloadSuccess(true);
      setTimeout(() => setDownloadSuccess(false), 3000);
    } catch (error) {
      console.error("Error generating PDF:", error);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ display: 'flex', flexDirection: 'column', backgroundColor: 'background.default', minHeight: '100vh' }}>
        {/* Header */}
        <Box sx={{ backgroundColor: 'primary.main', color: 'white', py: 3, textAlign: 'center', boxShadow: 3 }}>
          <Container>
            <Typography variant="h4" component="h1" gutterBottom>
              QuickPact
            </Typography>
            <Typography variant="subtitle1">
              Generate professional legal contracts with a simple summary
            </Typography>
            <Button 
              onClick={() => setShowInstructions(true)}
              color="secondary" 
              variant="contained" 
              size="small" 
              sx={{ mt: 2 }}
              startIcon={<InfoIcon />}
            >
              How to Use
            </Button>
          </Container>
        </Box>

        {/* Main Content */}
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4, flexGrow: 1 }}>
          {step === 1 ? (
            <Paper elevation={3} sx={{ p: { xs: 2, sm: 4 } }}>
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
              <Grid item xs={12} md={4} lg={3}>
                <Paper elevation={3} sx={{ p: 3, height: '100%' }}>
                  <Typography variant="h6" gutterBottom>
                    Edit Contract Details
                  </Typography>
                  <Divider sx={{ mb: 2 }} />
                  
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                    <TextField
                      label="Amount"
                      value={contractData.amount}
                      onChange={(e) => updateContractData('amount', e.target.value)}
                      size="small"
                      InputProps={{
                        startAdornment: <InputAdornment position="start">R</InputAdornment>,
                      }}
                    />
                    
                    {contractType === 'roommate' && (
                      <TextField
                        label="Number of Roommates"
                        value={contractData.roommateCount}
                        onChange={(e) => updateContractData('roommateCount', e.target.value)}
                        size="small"
                        type="number"
                      />
                    )}
                    
                    <TextField
                      label="Start Date"
                      value={contractData.startDate}
                      onChange={(e) => updateContractData('startDate', e.target.value)}
                      size="small"
                      placeholder="e.g. January 1, 2026"
                    />
                    
                    <TextField
                      label="Party 1"
                      value={contractData.party1}
                      onChange={(e) => updateContractData('party1', e.target.value)}
                      size="small"
                    />
                    
                    <TextField
                      label="Party 2"
                      value={contractData.party2}
                      onChange={(e) => updateContractData('party2', e.target.value)}
                      size="small"
                    />
                    
                    <TextField
                      label="Address"
                      value={contractData.address}
                      onChange={(e) => updateContractData('address', e.target.value)}
                      size="small"
                    />
                    
                    <TextField
                      label="Term (months)"
                      value={contractData.term}
                      onChange={(e) => updateContractData('term', e.target.value)}
                      size="small"
                      type="number"
                    />
                    
                    <TextField
                      label="Notice Period (days)"
                      value={contractData.notice}
                      onChange={(e) => updateContractData('notice', e.target.value)}
                      size="small"
                      type="number"
                    />
                  </Box>
                </Paper>
              </Grid>
              
              <Grid item xs={12} md={8} lg={9}>
                <Paper elevation={3} sx={{ mb: 3, overflow: 'auto', maxHeight: '70vh' }}>
                  <Box id="contract-content" sx={{
                    fontFamily: '"Times New Roman", Times, serif',
                    fontSize: '14px',
                    lineHeight: 1.6,
                    whiteSpace: 'pre-wrap',
                    padding: '20px',
                    '& h1': { fontSize: '24px', textAlign: 'center', fontWeight: 'bold', marginBottom: '1em' },
                    '& h2': { fontSize: '16px', fontWeight: 'bold' },
                    '& h3': { fontSize: '14px', fontWeight: 'bold' }
                  }}>
                    <div dangerouslySetInnerHTML={{ 
                      __html: generatedContract.replace(/\n/g, '<br />') 
                    }}></div>
                  </Box>
                </Paper>
                
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2, flexDirection: isMobile ? 'column' : 'row', gap: 2 }}>
                  <Button
                    onClick={() => setStep(1)}
                    variant="outlined"
                    startIcon={<ArrowBackIcon />}
                    fullWidth={isMobile}
                  >
                    Back to Editor
                  </Button>
                  <Button
                    onClick={downloadPDF}
                    variant="contained"
                    color="primary"
                    startIcon={<DownloadIcon />}
                    fullWidth={isMobile}
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
            © {new Date().getFullYear()} QuickPact
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

      <Instructions open={showInstructions} onClose={() => setShowInstructions(false)} />
    </ThemeProvider>
  );
}

export default App;