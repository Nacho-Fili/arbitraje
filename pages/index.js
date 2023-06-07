import { useState, useEffect } from 'react';

export default function Home() {
  const [usdtBuyPrice, setUsdtBuyPrice] = useState();
  const [usdtSellPrice, setUsdtSellPrice] = useState();
  const [transferFee, setTransferFee] = useState();
  const [ammountToBuy, setAmmountToBuy] = useState();
  const [minimumPriceToEarn, setMinimumPriceToEarn] = useState();
  const [profit, setProfit] = useState();

  useEffect(() => {
    if (!usdtBuyPrice || !usdtSellPrice || !transferFee) return;
    setMinimumPriceToEarn(
      ((transferFee * usdtBuyPrice) / (usdtSellPrice - usdtBuyPrice)).toFixed(2)
    );
  }, [usdtSellPrice, usdtBuyPrice, transferFee]);

  useEffect(() => {
    setProfit(
      ammountToBuy * (usdtSellPrice - usdtBuyPrice) - transferFee * usdtBuyPrice
    );
  }, [ammountToBuy]);

  return (
    <div className="container">
      <p>Precio de compra final (ARS)</p>
      <input
        type="text"
        value={usdtBuyPrice || ''}
        onChange={(e) => setUsdtBuyPrice(e.target.value)}
      />
      <p>Precio de venta (ARS)</p>
      <input
        type="text"
        value={usdtSellPrice || ''}
        onChange={(e) => setUsdtSellPrice(e.target.value)}
      />
      <p>Comisión de transferencia (USDT)</p>
      <input
        type="text"
        value={transferFee || ''}
        onChange={(e) => setTransferFee(e.target.value)}
      />
      {minimumPriceToEarn && (
        <>
          <p>
            <b>El monto minimo para ganar es de {minimumPriceToEarn}USDT</b>
          </p>
          <p>Monto a comprar</p>
          <input
            type="text"
            value={ammountToBuy || ''}
            onChange={(e) => setAmmountToBuy(e.target.value)}
          />
          {ammountToBuy && (
            <>
              <p>
                <b>Ganarías {profit}ARS</b>
              </p>
            </>
          )}
        </>
      )}
    </div>
  );
}
