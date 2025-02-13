import { Dialog, DialogTitle, DialogContent, TextField, Switch, FormControlLabel, Grid, Select, MenuItem, FormControl, InputLabel, Button, TableContainer, Table, TableHead, TableBody, TableRow, TableCell, IconButton } from "@mui/material";
import { useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import "./products.styles.scss";

function Variants({ open, onClose }) {
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedSubCategory, setSelectedSubCategory] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [variantList, setVariantList] = useState([]);

  const sizeOptions = {
    'Type': {
      Frame: [
        { value: '1', label: '1' },
        { value: '2', label: '2' }
      ],
      Lens: [
        { value: '1', label: '1' },
        { value: '2', label: '2' }
      ]
    },
    'Size': {
      in: [
        { value: '1', label: '1' },
        { value: '2', label: '2' }
      ],
      mm: [
        { value: '1', label: '1' },
        { value: '2', label: '2' }
      ]
    },
    'Weight': {
      g: [
        { value: '2', label: '2' },
        { value: '3', label: '3' }
      ],
      kg: [
        { value: '4', label: '4' },
        { value: '5', label: '5' }
      ]
    }
  };

  const handleSizeChange = (event) => {
    const newSize = event.target.value;
    setSelectedSize(newSize);
    setSelectedSubCategory(''); // Reset sub-category
    setSelectedColor(''); // Reset color
  };

  const handleSubCategoryChange = (event) => {
    const newSubCategory = event.target.value;
    setSelectedSubCategory(newSubCategory);
    setSelectedColor(''); // Reset color when sub-category changes
  };

  const handleAddVariant = () => {
    if (selectedSize && selectedSubCategory && selectedColor) {
      const newVariant = {
        id: Date.now(), // Simple unique ID
        type: selectedSize,
        subCategory: selectedSubCategory,
        color: selectedColor,
        colorLabel: sizeOptions[selectedSize][selectedSubCategory].find(c => c.value === selectedColor)?.label
      };
      setVariantList([...variantList, newVariant]);
      
      // Reset selections after adding
      setSelectedSize('');
      setSelectedSubCategory('');
      setSelectedColor('');
    }
  };

  const getAllCombinations = () => {
    const result = {};
    
    // Only process the variants that have been added
    variantList.forEach(variant => {
      const key = `${variant.type}-${variant.subCategory}`;
      
      if (!result[key]) {
        result[key] = {
          Type: '',
          Size: '',
          Weight: '',
          variants: [],
          count: 0
        };
      }

      if (!result[key].variants.includes(variant.colorLabel)) {
        result[key].variants.push(variant.colorLabel);
      }
      
      result[key] = {
        ...result[key],
        [variant.type]: variant.subCategory, // Show subCategory value instead of variants
        count: (result[key].count || 0) + 1
      };
    });
    
    return result;
  };

  return (
    <Dialog 
      open={open} 
      onClose={onClose}
      maxWidth="xl"
      fullWidth
      PaperProps={{
        sx: {
          height: "70vh",
          width: "70vw",
          maxWidth: "70vw",
        },
      }}
    >
      <DialogTitle className="font-bold" sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        Variants
        <FormControlLabel
          control={<Switch />}
          label="Use same image"
          labelPlacement="start"
        />
      </DialogTitle>
      <DialogContent>
        <Grid container spacing={2}>
          <Grid item xs={3.6}>
            <div style={{ backgroundColor: '#f5f5f5', height: '100%', padding: '16px' }}>
              <FormControl fullWidth sx={{ mb: 2 }}>
                <InputLabel>Type</InputLabel>
                <Select
                  value={selectedSize}
                  label="Type"
                  onChange={handleSizeChange}
                >
                  {Object.keys(sizeOptions).map((size) => (
                    <MenuItem key={size} value={size}>
                      {size}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              {selectedSize && (
                <FormControl fullWidth sx={{ mb: 2 }}>
                  <InputLabel>Sub Category</InputLabel>
                  <Select
                    value={selectedSubCategory}
                    label="Sub Category"
                    onChange={handleSubCategoryChange}
                  >
                    {Object.keys(sizeOptions[selectedSize]).map((subCat) => (
                      <MenuItem key={subCat} value={subCat}>
                        {subCat}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              )}

              {selectedSize && selectedSubCategory && (
                <FormControl fullWidth>
                  <InputLabel>Value</InputLabel>
                  <Select
                    value={selectedColor}
                    label="Color"
                    onChange={(e) => setSelectedColor(e.target.value)}
                  >
                    {sizeOptions[selectedSize][selectedSubCategory].map((color) => (
                      <MenuItem key={color.value} value={color.value}>
                        {color.label}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              )}

              {selectedSize && selectedSubCategory && selectedColor && (
                <Button 
                  variant="contained" 
                  fullWidth 
                  onClick={handleAddVariant}
                  sx={{ mt: 2 }}
                >
                  Add Variant
                </Button>
              )}
            </div>
          </Grid>
          <Grid item xs={8.4}>
            <div style={{ backgroundColor: '#f5f5f5', height: '100%', padding: '16px' }}>
              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Type</TableCell>
                      <TableCell>Size</TableCell>
                      <TableCell>Weight</TableCell>
                      <TableCell>Count</TableCell>
                      <TableCell>Actions</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {Object.entries(getAllCombinations()).map(([key, data]) => {
                      const [type, subCategory] = key.split('-');
                      return (
                        <TableRow key={key}>
                          <TableCell>{data.Type}</TableCell>
                          <TableCell>{data.Size}</TableCell>
                          <TableCell>{data.Weight}</TableCell>
                          <TableCell>{data.count}</TableCell>
                          <TableCell>
                            {data.count > 0 && (
                              <IconButton 
                                size="small" 
                                onClick={() => {
                                  // Remove all variants matching the current type-subCategory combination
                                  setVariantList(variantList.filter(v => 
                                    `${v.type}-${v.subCategory}` !== key
                                  ));
                                }}
                              >
                                <DeleteIcon />
                              </IconButton>
                            )}
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </TableContainer>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '16px', gap: '16px' }}>
                <Button variant="contained" className="button" fullWidth>Save</Button>
                <Button variant="outlined" className="button" fullWidth>Cancel</Button>
            </div>
          </Grid>
        </Grid>
      </DialogContent>
    </Dialog>
  );
}

export default Variants;
