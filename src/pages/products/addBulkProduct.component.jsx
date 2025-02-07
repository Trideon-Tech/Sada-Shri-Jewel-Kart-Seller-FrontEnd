import { Button, Modal, Box, Typography, TextField } from "@mui/material";
import { useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import { generalToastStyle } from "../../utils/toast.styles";
import { useNavigate } from "react-router-dom";

function AddBulkProduct() {
    const navigate = useNavigate();
    const MakingChargeTypeMapping = {
        "6": "Making Charge / Gram",
        "7": "Making Charge / Piece",
        "8": "Piece Cost",
        "9": "Making Charge %",
    }
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

            // New CSV parsing logic that handles quoted fields
            const values = [];
            let currentValue = '';
            let insideQuotes = false;

            for (let char of lines[i]) {
                if (char === '"') {
                    insideQuotes = !insideQuotes;
                } else if (char === ',' && !insideQuotes) {
                    values.push(currentValue.trim());
                    currentValue = '';
                } else {
                    currentValue += char;
                }
            }
            values.push(currentValue.trim()); // Push the last value

            // Remove quotes from the beginning and end of values
            const cleanedValues = values.map(value =>
                value.replace(/^"(.*)"$/, '$1').trim()
            );

            const tagIndex = headers.findIndex(header =>
                header.toLowerCase() === 'tag' || header.toLowerCase() === 'tags'
            );

            const tags = cleanedValues[tagIndex];
            if (!tags) {
                throw new Error(`Row ${i + 1}: Tags are required`);
            }

            // Transform the data to match the required API format
            const item = {
                name: cleanedValues[headers.findIndex(h => h === 'Product Name')] || '',
                desc: cleanedValues[headers.findIndex(h => h === 'Description')] || '',
                category: cleanedValues[headers.findIndex(h => h === 'Category')] || '',
                sub_category: cleanedValues[headers.findIndex(h => h === 'Sub-Cat.')] || '',
                size: cleanedValues[headers.findIndex(h => h === 'Size')] || '',
                hsn: cleanedValues[headers.findIndex(h => h === 'HSN')] || '',
                tags: tags,
                quantity: parseInt(cleanedValues[headers.findIndex(h => h === 'Quantity')]) || 1,
                discount_perc: parseFloat(cleanedValues[headers.findIndex(h => h === 'Discount %')]) || "0",
                customization_option: [
                    cleanedValues[headers.findIndex(h => h === 'Quantity')] || '',
                    MakingChargeTypeMapping[cleanedValues[headers.findIndex(h => h === 'MC Type')]] || '',
                    cleanedValues[headers.findIndex(h => h === 'Stone Type')] || ''
                ].filter(val => val !== '').join(','),

                metal: {
                    metal: cleanedValues[headers.findIndex(h => h === 'Metal Type')]?.toLowerCase() || '',
                    quality: cleanedValues[headers.findIndex(h => h === 'Metal Purity')] || '',
                    quantity: cleanedValues[headers.findIndex(h => h === 'Quantity')] || "0",
                    gross_wt: parseFloat(cleanedValues[headers.findIndex(h => h === 'Metal Gross Weight')]) || "0",
                    stone_wt: parseFloat(cleanedValues[headers.findIndex(h => h === 'Stone Weight')]) || "0",
                    net_wt: parseFloat(cleanedValues[headers.findIndex(h => h === 'Net Weight')]) || "0",
                    wastage_prec: parseFloat(cleanedValues[headers.findIndex(h => h === 'Wastage %')]) || "0",
                    wastage_wt: parseFloat(cleanedValues[headers.findIndex(h => h === 'Wastage Weight')]) || "0",
                    net_wt_after_wastage: parseFloat(cleanedValues[headers.findIndex(h => h === 'Net New Wt.')]) || "0",
                    making_charge_type: cleanedValues[headers.findIndex(h => h === 'MC Type')] || "0",
                    making_charge_value: parseFloat(cleanedValues[headers.findIndex(h => h === 'MC %')]) || "0",
                    making_charge_amount: parseFloat(cleanedValues[headers.findIndex(h => h === 'Mc Amt.')]) || "0",
                    stone_amount: parseFloat(cleanedValues[headers.findIndex(h => h === 'Stone Amt.')]) || "0",
                    hallmark_charge: parseFloat(cleanedValues[headers.findIndex(h => h === 'Hallmark Amt.')]) || "0",
                    rodium_charge: parseFloat(cleanedValues[headers.findIndex(h => h === 'Rodium/Cert. Cg.')]) || "0",
                    gst_perc: parseFloat(cleanedValues[headers.findIndex(h => h === 'Metal GST')]) || "0",
                },

                stone: {
                    stone_type: cleanedValues[headers.findIndex(h => h === 'Stone Type')] || '',
                    color: cleanedValues[headers.findIndex(h => h === 'Color')] || '',
                    clarity: cleanedValues[headers.findIndex(h => h === 'Clarity')] || '',
                    cut: cleanedValues[headers.findIndex(h => h === 'Cut')] || "0",
                    pieces: parseInt(cleanedValues[headers.findIndex(h => h === 'Pieces')]) || "0",
                    carat: parseFloat(cleanedValues[headers.findIndex(h => h === 'Carat')]) || "0",
                    stone_wt: parseFloat(cleanedValues[headers.findIndex(h => h === 'Stone Weight')]) || "0",
                    stone_rate: parseFloat(cleanedValues[headers.findIndex(h => h === 'Stone Rate')]) || "0",
                    gst_perc: parseFloat(cleanedValues[headers.findIndex(h => h === 'Stone GST')]) || "0",
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

                    if (response.data.success === 1) {
                        toast("Products uploaded successfully!", generalToastStyle);
                        handleClose();
                        navigate("/products");
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
                    width: 600,
                    height: 250,
                    bgcolor: 'background.paper',
                    boxShadow: 24,
                    p: 4,
                    borderRadius: 2,
                }}>
                    <div className="flex justify-between items-center">
                        <Typography variant="h6" component="h2" className="pb-6">
                            Import Products
                        </Typography>
                        <Button
                            variant="text"
                            onClick={() => {
                                const link = document.createElement('a');
                                link.href = '/templates/ssjk_bulk_import_template.csv'; // You'll need to place your CSV file in the public/templates folder
                                link.download = 'ssjk_bulk_import_template.csv';
                                document.body.appendChild(link);
                                link.click();
                                document.body.removeChild(link);
                            }}
                            sx={{
                                color: '#a36e29',
                                mb: 2,
                                '&:hover': {
                                    backgroundColor: 'rgba(163, 110, 41, 0.04)'
                                }
                            }}
                        >
                            Download Template
                        </Button>
                    </div>
                    <input
                        type="file"
                        accept=".csv"
                        onChange={handleFileChange}
                        style={{ display: 'none' }}
                        id="csv-file-input"
                    />
                    <label htmlFor="csv-file-input">
                        <Button
                            variant="outlined"
                            component="span"
                            fullWidth
                            sx={{
                                borderColor: '#a36e29',
                                color: '#a36e29',
                                '&:hover': {
                                    borderColor: '#8b5d23',
                                    backgroundColor: 'rgba(163, 110, 41, 0.04)'
                                }
                            }}
                        >
                            Choose CSV File
                        </Button>
                    </label>
                    {file && (
                        <Typography sx={{ mt: 2, textAlign: 'center' }}>
                            Selected file: {file.name}
                        </Typography>
                    )}
                    <Button
                        variant="contained"
                        onClick={handleUpload}
                        sx={{
                            mt: 4,
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