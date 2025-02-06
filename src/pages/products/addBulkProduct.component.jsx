import { Button, Modal, Box, Typography, TextField } from "@mui/material";
import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

function AddBulkProduct() {
    const [ImportCsvModalOpen, setImportCsvModalOpen] = useState(false);
    const [file, setFile] = useState(null);

    const handleImport = () => {
        setImportCsvModalOpen(true);
    }

    const handleClose = () => {
        setImportCsvModalOpen(false);
        setFile(null);
    }

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        setFile(file);
    }

    const processCSV = async (csvText) => {
        const lines = csvText.split('\n');
        const headers = lines[0].split(',').map(header => header.trim());
        const items = [];

        console.log('Headers:', headers);

        for (let i = 1; i < lines.length; i++) {
            if (!lines[i].trim()) continue;

            const values = lines[i].split(',').map(value => value.trim());
            
            const tagIndex = headers.findIndex(header => 
                header.toLowerCase() === 'tag' || header.toLowerCase() === 'tags'
            );
            
            const tags = values[tagIndex];
            if (!tags) {
                throw new Error(`Row ${i + 1}: Tags are required`);
            }

            // Transform the data to match the required API format
            const item = {
                name: values[headers.findIndex(h => h === 'Product Name')] || '',
                desc: values[headers.findIndex(h => h === 'Description')] || '',
                category: values[headers.findIndex(h => h === 'Category')] || '',
                sub_category: values[headers.findIndex(h => h === 'Sub-Cat.')] || '',
                size: values[headers.findIndex(h => h === 'Size')] || '',
                hsn: values[headers.findIndex(h => h === 'HSN')] || '', // Default HSN code
                tags: tags,
                quantity: parseInt(values[headers.findIndex(h => h === 'Quantity')]) || 0,
                price: 0, // Will be calculated based on metal and stone details
                weight: parseFloat(values[headers.findIndex(h => h === 'Metal Gross Weight')]) || 0,
                height: 0, // Not in CSV, defaulting to 0
                width: 0, // Not in CSV, defaulting to 0
                purity: parseFloat(values[headers.findIndex(h => h === 'Metal Purity')]) || 0,
                discount_perc: parseFloat(values[headers.findIndex(h => h === 'Discount %')]) || 0,
                customization_option: "", // Default value

                metal: {
                    type: values[headers.findIndex(h => h === 'Metal Type')]?.toLowerCase() || '',
                    quality: values[headers.findIndex(h => h === 'Metal Purity')] || '',
                    gross_wt: parseFloat(values[headers.findIndex(h => h === 'Metal Gross Weight')]) || 0,
                    stone_wt: parseFloat(values[headers.findIndex(h => h === 'Stone Weight')]) || 0,
                    net_wt: parseFloat(values[headers.findIndex(h => h === 'Net Weight')]) || 0,
                    wastage_prec: parseFloat(values[headers.findIndex(h => h === 'Wastage %')]) || 0,
                    wastage_wt: parseFloat(values[headers.findIndex(h => h === 'Wastage Weight')]) || 0,
                    net_wt_after_wastage: parseFloat(values[headers.findIndex(h => h === 'Net New Wt.')]) || 0,
                    making_charge_type: values[headers.findIndex(h => h === 'MC Type')] || '',
                    making_charge_value: parseFloat(values[headers.findIndex(h => h === 'MC')]) || 0,
                    making_charge_amount: parseFloat(values[headers.findIndex(h => h === 'Mc Amt.')]) || 0,
                    stone_amount: parseFloat(values[headers.findIndex(h => h === 'Stone Amt.')]) || 0,
                    hallmark_charge: parseFloat(values[headers.findIndex(h => h === 'Hallmark Amt.')]) || 0,
                    rodium_charge: parseFloat(values[headers.findIndex(h => h === 'Rodium/Cert. Cg.')]) || 0,
                    gst_perc: parseFloat(values[headers.findIndex(h => h === 'Metal GST')]) || 0,
                },

                stone: {
                    type: values[headers.findIndex(h => h === 'Stone Type')] || '',
                    color: values[headers.findIndex(h => h === 'Color')] || '',
                    clarity: values[headers.findIndex(h => h === 'Clarity')] || '',
                    cut: values[headers.findIndex(h => h === 'Cut')] || '',
                    pieces: parseInt(values[headers.findIndex(h => h === 'Pieces')]) || 0,
                    carat: parseFloat(values[headers.findIndex(h => h === 'Carat')]) || 0,
                }
            };
            items.push(item);
        }

        return { type: "bulk_items", items };
    }

    const handleUpload = async () => {
        if (!file) {
            toast.error("Please select a file first!");
            return;
        }

        try {
            const reader = new FileReader();
            reader.onload = async (e) => {
                const text = e.target.result;
                try {
                    const data = await processCSV(text);
                    console.log('Sending data to API:', data);

                    const response = await axios.post(
                        `${process.env.REACT_APP_API_BASE_URL}/v1.0.0/seller/product/addProduct.php`,
                        data,
                        {
                            headers: {
                                "Content-Type": "application/json",
                                Authorization: `Bearer ${localStorage.getItem("token")}`,
                            },
                        }
                    );

                    if (response.data.status === "success") {
                        toast.success("Products uploaded successfully!");
                        handleClose();
                    } else {
                        toast.error(response.data.message || "Failed to upload products");
                    }
                } catch (error) {
                    console.error('Error:', error);
                    if (error.message.includes('Tags are required')) {
                        toast.error(error.message);
                    } else {
                        toast.error(error.response?.data?.message || "Error processing CSV file. Please check the format.");
                    }
                }
            };
            reader.readAsText(file);
        } catch (error) {
            console.error("Error uploading products:", error);
            toast.error("Error uploading products. Please try again.");
        }
    }

    return (
        <>
            <Modal 
                open={ImportCsvModalOpen} 
                onClose={handleClose} 
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: 400,
                    bgcolor: 'background.paper',
                    boxShadow: 24,
                    p: 4,
                    borderRadius: 2,
                }}>
                    <Typography variant="h6" component="h2" gutterBottom>
                        Import Products
                    </Typography>
                    <TextField
                        variant="outlined"
                        type="file"
                        fullWidth
                        accept=".csv"
                        onChange={handleFileChange}
                    />
                    <Button 
                        variant="contained" 
                        onClick={handleUpload}
                        sx={{ 
                            mt: 2,
                            backgroundColor: '#a36e29',
                            '&:hover': {
                                backgroundColor: '#8b5d23',
                            }
                        }}
                        fullWidth
                    >
                        Upload
                    </Button>
                </Box>
            </Modal>
            <Button 
                className="button" 
                onClick={handleImport}
                sx={{
                    backgroundColor: '#a36e29',
                    color: 'white',
                    '&:hover': {
                        backgroundColor: '#8b5d23',
                    }
                }}
            >
                Import Products +
            </Button>
        </>
    )
}

export default AddBulkProduct;