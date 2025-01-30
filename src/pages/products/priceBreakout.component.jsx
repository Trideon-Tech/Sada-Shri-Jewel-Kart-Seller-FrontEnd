import React, { useState, useEffect } from 'react';
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import CloseIcon from "@mui/icons-material/Close";

const PriceBreakout = ({ open, onClose, data, handleSettlementAmountChange }) => {
    const [priceDetails, setPriceDetails] = useState(null);

    // Calculate whenever data changes, regardless of dialog state
    useEffect(() => {
        if (data) {
            const result = calculatePaymentDetails(data);
            setPriceDetails(result);
            
            if (handleSettlementAmountChange) {
                handleSettlementAmountChange(result.totalAmountAfterDeduction);
            }
        }
    }, [data, handleSettlementAmountChange]); // Removed 'open' from dependencies

    const calculatePaymentDetails = (data) => {
        const metalBaseAmount = isNaN(parseFloat((parseFloat(data.metal_calculation?.base_amount, 2) - parseFloat(data.metal_calculation?.mc, 2)).toFixed(2))) ? 0 : parseFloat((parseFloat(data.metal_calculation?.base_amount, 2) - parseFloat(data.metal_calculation?.mc, 2)).toFixed(2));
        console.log('metalBaseAmount:', metalBaseAmount);
        
        const stoneBaseAmount = isNaN(parseFloat(data.stone_calculation?.base_amount, 2)) ? 0 : parseFloat(data.stone_calculation?.base_amount, 2);
        console.log('stoneBaseAmount:', stoneBaseAmount);
        
        const metalMakingChargeAmount = isNaN(parseFloat(data.metal_calculation?.mc, 2)) ? 0 : parseFloat(data.metal_calculation?.mc, 2);
        console.log('metalMakingChargeAmount:', metalMakingChargeAmount);
        
        const metalTotalAmount = isNaN(parseFloat(metalBaseAmount, 2) + parseFloat(metalMakingChargeAmount, 2)) ? 0 : parseFloat(metalBaseAmount, 2) + parseFloat(metalMakingChargeAmount, 2);
        console.log('metalTotalAmount:', metalTotalAmount);
        
        const metalGst = isNaN(parseFloat((metalTotalAmount * (parseFloat(data.metal_calculation?.gst_perc) / 100)).toFixed(2))) ? 0 : parseFloat((metalTotalAmount * (parseFloat(data.metal_calculation?.gst_perc) / 100)).toFixed(2));
        console.log('metalGst:', metalGst);
        
        const metalNetAmount = isNaN(parseFloat((metalTotalAmount + metalGst).toFixed(2))) ? 0 : parseFloat((metalTotalAmount + metalGst).toFixed(2));
        console.log('metalNetAmount:', metalNetAmount);

        const stoneGst = isNaN(parseFloat((stoneBaseAmount * (parseFloat(data.stone_calculation?.gst_perc) / 100)).toFixed(2))) ? 0 : parseFloat((stoneBaseAmount * (parseFloat(data.stone_calculation?.gst_perc) / 100)).toFixed(2));
        console.log('stoneGst:', stoneGst);
        
        const stoneNetAmount = isNaN(parseFloat((stoneBaseAmount + stoneGst).toFixed(2))) ? 0 : parseFloat((stoneBaseAmount + stoneGst).toFixed(2));
        console.log('stoneNetAmount:', stoneNetAmount);

        const adminCommission = isNaN(parseFloat(data.admin_commission_perc)) ? 0 : parseFloat(data.admin_commission_perc);
        console.log('adminCommission:', adminCommission);

        const subTotal = isNaN(parseFloat((metalNetAmount + stoneNetAmount).toFixed(2))) ? 0 : parseFloat((metalNetAmount + stoneNetAmount).toFixed(2));
        console.log('subTotal:', subTotal);

        let totalAmount = subTotal;
        console.log('totalAmount:', totalAmount);

        const taxRate = 5;
        const taxAmount = isNaN(parseFloat((totalAmount * 0.05).toFixed(2))) ? 0 : parseFloat((totalAmount * 0.05).toFixed(2));
        console.log('taxAmount:', taxAmount);
        
        const tdsAmount = isNaN(parseFloat((totalAmount * 0.01).toFixed(2))) ? 0 : parseFloat((totalAmount * 0.01).toFixed(2));
        console.log('tdsAmount:', tdsAmount);
        
        const commission = isNaN(parseFloat((totalAmount * adminCommission * 0.01).toFixed(2))) ? 0 : parseFloat((totalAmount * adminCommission * 0.01).toFixed(2));
        console.log('commission:', commission);

        const tcs = isNaN(parseFloat((totalAmount - commission - tdsAmount) * 0.01).toFixed(2)) ? 0 : parseFloat((totalAmount - commission - tdsAmount) * 0.01).toFixed(2);
        console.log('tcs:', tcs);
        
        const totalAmountAfterDeduction = isNaN(parseFloat((totalAmount - commission - tdsAmount - tcs - taxAmount).toFixed(2))) ? 0 : parseFloat((totalAmount - commission - tdsAmount - tcs - taxAmount).toFixed(2));
        console.log('totalAmountAfterDeduction:', totalAmountAfterDeduction);
        
        return {
            taxRate: taxRate,
            taxAmount: taxAmount,
            subTotal: totalAmount,
            totalDiscount: 0, // No discount logic
            totalAmount: Math.round(totalAmount),
            subTotalAmount: Math.round(subTotal),
            tdsAmount: tdsAmount,
            commission: commission,
            tcs: tcs,
            totalAmountAfterDeduction: totalAmountAfterDeduction,
            metal_calculation: {
                base_amount: metalBaseAmount,
                gst_perc: data.metal_calculation?.gst_perc,
                making_charge_amount: data.metal_calculation?.mc,
                net_amount: metalNetAmount,
                gst_amount: metalGst,
            },
            stone_calculation: {
                base_amount: stoneBaseAmount,
                gst_perc: data.stone_calculation?.gst_perc,
                making_charge_amount: data.stone_calculation?.mc,
                net_amount: stoneNetAmount,
                gst_amount: stoneGst,
            }
        };
    };

    return (
        <Dialog open={open} onClose={onClose} sx={{ width: '100%', overflow: 'hidden' }} maxWidth='md' fullWidth>
            <DialogTitle style={{ fontSize: '1.5rem', fontWeight: 'bold', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}><span>Price Breakout</span> <Button onClick={onClose}>
            <CloseIcon style={{ fontSize: "2rem", color: "#A36E29" }} />
            </Button></DialogTitle>
            <Divider sx={{marginLeft: '1.5rem', marginRight: '1.5rem' }} />
            <DialogContent sx={{ width: '100%' }}>
                {priceDetails ? (
                    <div style={{ width: '100%', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '20px' }}>
                        <div style={{ display: 'flex', flexDirection: 'row', gap: '20px' }}>
                            <div style={{ border: '1px solid #ccc', padding: '10px', width: '100%' }}>
                                <h2 style={{ fontSize: '1.2rem', fontWeight: 'bold', marginBottom: '1rem' }}>Metal Calculation</h2>
                                <p style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}><span style={{ marginRight: '10px' }}>Base Amount:</span> {!isNaN(priceDetails.metal_calculation.base_amount) ? priceDetails.metal_calculation.base_amount : 0}</p>
                                <p style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}><span style={{ marginRight: '10px' }}>Making Charge Amount:</span> {!isNaN(priceDetails.metal_calculation.making_charge_amount) ? priceDetails.metal_calculation.making_charge_amount : 0}</p>
                                <p style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}><span style={{ marginRight: '10px' }}>GST Percentage:</span> {!isNaN(priceDetails.metal_calculation.gst_perc) ? priceDetails.metal_calculation.gst_perc : 0}%</p>
                                <p style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}><span style={{ marginRight: '10px' }}>GST Amount:</span> {!isNaN(priceDetails.metal_calculation.gst_amount) ? priceDetails.metal_calculation.gst_amount : 0}</p>
                                <p style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}><span style={{ marginRight: '10px' }}>Net Amount:</span> {!isNaN(priceDetails.metal_calculation.net_amount) ? priceDetails.metal_calculation.net_amount : 0}</p>
                            </div>
                            <div style={{ border: '1px solid #ccc', padding: '10px', width: '100%' }}>
                                <h2 style={{ fontSize: '1.2rem', fontWeight: 'bold', marginBottom: '1rem' }}>Stone Calculation</h2>
                                <p style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}><span style={{ marginRight: '10px' }}>Base Amount:</span> {!isNaN(priceDetails.stone_calculation.base_amount) ? priceDetails.stone_calculation.base_amount : 0}</p>
                                <p style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}><span style={{ marginRight: '10px' }}>GST Percentage:</span> {!isNaN(priceDetails.stone_calculation.gst_perc) ? priceDetails.stone_calculation.gst_perc : 0}%</p>
                                <p style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}><span style={{ marginRight: '10px' }}>GST Amount:</span> {!isNaN(priceDetails.stone_calculation.gst_amount) ? priceDetails.stone_calculation.gst_amount : 0}</p>
                                <p style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}><span style={{ marginRight: '10px' }}>Net Amount:</span> {!isNaN(priceDetails.stone_calculation.net_amount) ? priceDetails.stone_calculation.net_amount : 0}</p>
                            </div>
                        </div>
                        <Divider />
                        <div style={{ border: '1px solid #ccc', padding: '10px', width: '100%' }}>
                            <h2 style={{ fontSize: '1.2rem', fontWeight: 'bold', marginBottom: '1rem' }}>Total</h2>
                            <p style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}><span style={{ marginRight: '10px' }}>Subtotal:</span> {!isNaN(priceDetails.subTotal) ? priceDetails.subTotal : 0}</p>
                            <p style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}><span style={{ marginRight: '10px' }}>Tax Rate:</span> {!isNaN(priceDetails.taxRate) ? priceDetails.taxRate : 0}%</p>
                            <p style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}><span style={{ marginRight: '10px' }}>Tax Amount:</span> {!isNaN(priceDetails.taxAmount) ? priceDetails.taxAmount : 0}</p>
                            <p style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}><span style={{ marginRight: '10px' }}>TDS Amount:</span> {!isNaN(priceDetails.tdsAmount) ? priceDetails.tdsAmount : 0}</p>
                            <p style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}><span style={{ marginRight: '10px' }}>Commission:</span> {!isNaN(priceDetails.commission) ? priceDetails.commission : 0}</p>
                            <p style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}><span style={{ marginRight: '10px' }}>TCS:</span> {!isNaN(priceDetails.tcs) ? priceDetails.tcs : 0}</p>
                            <p style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}><span style={{ marginRight: '10px' }}>Settlement Amount:</span> {!isNaN(priceDetails.totalAmountAfterDeduction) ? priceDetails.totalAmountAfterDeduction : 0}</p>
                        </div>
                    </div>
                ) : (
                    <p>Loading...</p>
                )}
            </DialogContent>
        </Dialog>
    );
}

export default PriceBreakout;