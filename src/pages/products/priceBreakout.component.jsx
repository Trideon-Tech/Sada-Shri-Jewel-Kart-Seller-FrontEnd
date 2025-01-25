import React, { useState, useEffect } from 'react';
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";

const PriceBreakout = ({ open, onClose, data}) => {
    console.log('data',data);
    const [priceDetails, setPriceDetails] = useState(null);

    const calculatePaymentDetails = (data) => {
        console.log('commission',data.admin_comm_perc);
        // Use the provided data for calculations
        const metalBaseAmount = parseFloat(data.metal_calculation.base_amount, 2) - parseFloat(data.metal_calculation.mc, 2);
        const stoneBaseAmount = parseFloat(data.stone_calculation.base_amount, 2)

        // Get making charge amount
        const metalMakingChargeAmount = parseFloat(data.metal_calculation.mc, 2);
        const metalTotalAmount = parseFloat(metalBaseAmount, 2) + parseFloat(metalMakingChargeAmount, 2);
        // Calculate GST for metal
        const metalGst = metalTotalAmount * (parseFloat(data.metal_calculation.gst_perc) / 100);
        const metalNetAmount = metalTotalAmount + metalGst;

        // Calculate GST for stone
        const stoneGst = stoneBaseAmount * (parseFloat(data.stone_calculation.gst_perc) / 100);
        const stoneNetAmount = stoneBaseAmount + stoneGst;

        const adminCommission = data.admin_commission_perc;

        // Calculate subtotal from metal and stone base amounts
        const subTotal = parseFloat((metalNetAmount + stoneNetAmount).toFixed(2));

        let totalAmount = subTotal;

        // Assuming 5% tax
        const taxRate = 5;
        const taxAmount = parseFloat((totalAmount * 0.05).toFixed(2));
        const tdsAmount = parseFloat((totalAmount * 0.01).toFixed(2));
        const commission = parseFloat((totalAmount * adminCommission * 0.01).toFixed(2));

        const tcs = parseFloat((totalAmount - commission - tdsAmount) * 0.01).toFixed(2);
        const totalAmountAfterDeduction = parseFloat((totalAmount - commission - tdsAmount - tcs - taxAmount).toFixed(2));

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
                gst_perc: data.metal_calculation.gst_perc,
                making_charge_amount: data.metal_calculation.mc,
                net_amount: metalNetAmount,
                gst_amount: metalGst,
            },
            stone_calculation: {
                base_amount: stoneBaseAmount,
                gst_perc: data.stone_calculation.gst_perc,
                making_charge_amount: data.stone_calculation.mc,
                net_amount: stoneNetAmount,
                gst_amount: stoneGst,
            }
        };
    };

    useEffect(() => {
        if (open) {
            const result = calculatePaymentDetails(data);
            setPriceDetails(result);
        }
    }, [open, data]);

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>Price Breakout</DialogTitle>
            <DialogContent>
                {priceDetails ? (
                    <div style={{ width: '100%', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '20px' }}>
                        <div>
                            <h2>Price Details</h2>
                        </div>
                        <div style={{ border: '1px solid #ccc', padding: '10px', width: '100%' }}>
                            <h3>Metal Calculation</h3>
                            <p>Base Amount: {priceDetails.metal_calculation.base_amount}</p>
                            <p>Making Charge: {priceDetails.metal_calculation.mc}</p>
                            <p>Making Charge Amount: {priceDetails.metal_calculation.making_charge_amount}</p>
                            <p>GST Percentage: {priceDetails.metal_calculation.gst_perc}%</p>
                            <p>GST Amount: {priceDetails.metal_calculation.gst_amount}</p>
                            <p>Net Amount: {priceDetails.metal_calculation.net_amount}</p>
                        </div>
                        <div style={{ border: '1px solid #ccc', padding: '10px' }}>
                            <h3>Stone Calculation</h3>
                            <p>Base Amount: {priceDetails.stone_calculation.base_amount}</p>
                            <p>GST Percentage: {priceDetails.stone_calculation.gst_perc}%</p>
                            <p>GST Amount: {priceDetails.stone_calculation.gst_amount}</p>
                            <p>Net Amount: {priceDetails.stone_calculation.net_amount}</p>
                        </div>
                        <div style={{ border: '1px solid #ccc', padding: '10px' }}>
                            <h3>Total</h3>
                            <p>Subtotal: {priceDetails.subTotal}</p>
                            <p>Tax Rate: {priceDetails.taxRate}%</p>
                            <p>Tax Amount: {priceDetails.taxAmount}</p>
                            <p>TDS Amount: {priceDetails.tdsAmount}</p>
                            <p>Commission: {priceDetails.commission}</p>
                            <p>TCS: {priceDetails.tcs}</p>
                            <p>Settlement Amount: {priceDetails.totalAmountAfterDeduction}</p>
                        </div>
                    </div>
                ) : (
                    <p>Loading...</p>
                )}
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>Close</Button>
            </DialogActions>
        </Dialog>
    );
}

export default PriceBreakout;