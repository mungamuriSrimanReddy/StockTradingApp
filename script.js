/* =====================================================
   VIRTUAL STOCK TRADING APP
===================================================== */


/* =====================================================
   1. STARTING BALANCE
===================================================== */

var startingBalance = 100000;


/* =====================================================
   2. DEFAULT REAL-WORLD STOCKS
   Prices are SIMULATED for the project
===================================================== */

var defaultStocks = [

    {
        symbol: "AAPL",
        company: "Apple Inc.",
        price: 170.50,
        startPrice: 170.50,
        history: [170.50]
    },

    {
        symbol: "TSLA",
        company: "Tesla Inc.",
        price: 212.52,
        startPrice: 212.52,
        history: [212.52]
    },

    {
        symbol: "AMZN",
        company: "Amazon.com",
        price: 134.88,
        startPrice: 134.88,
        history: [134.88]
    },

    {
        symbol: "GOOGL",
        company: "Alphabet Inc.",
        price: 139.17,
        startPrice: 139.17,
        history: [139.17]
    },

    {
        symbol: "MSFT",
        company: "Microsoft Corp.",
        price: 334.59,
        startPrice: 334.59,
        history: [334.59]
    },

    {
        symbol: "NVDA",
        company: "NVIDIA Corp.",
        price: 480.25,
        startPrice: 480.25,
        history: [480.25]
    },

    {
        symbol: "META",
        company: "Meta Platforms",
        price: 295.40,
        startPrice: 295.40,
        history: [295.40]
    },

    {
        symbol: "NFLX",
        company: "Netflix Inc.",
        price: 420.75,
        startPrice: 420.75,
        history: [420.75]
    }

];


var stocks = [];


/* =====================================================
   3. INITIALIZE STOCKS
===================================================== */

function initializeManagedStocks() {

    var saved =
        localStorage.getItem(
            "managedStocks"
        );


    if (saved === null) {

        stocks =
            JSON.parse(
                JSON.stringify(
                    defaultStocks
                )
            );


        localStorage.setItem(
            "managedStocks",
            JSON.stringify(stocks)
        );

        return;
    }


    var oldStocks =
        JSON.parse(saved);


    /*
       Replace old ABC Ltd style data with
       the new real-world stock structure.
    */

    if (
        oldStocks.length === 0 ||
        oldStocks[0].symbol === undefined
    ) {

        stocks =
            JSON.parse(
                JSON.stringify(
                    defaultStocks
                )
            );


        localStorage.setItem(
            "managedStocks",
            JSON.stringify(stocks)
        );

        return;
    }


    stocks =
        oldStocks;
}


/* =====================================================
   4. SAVE STOCKS
===================================================== */

function saveManagedStocks() {

    localStorage.setItem(
        "managedStocks",
        JSON.stringify(stocks)
    );
}


/* =====================================================
   5. LOAD SAVED PRICES
===================================================== */

function loadSavedPrices() {

    if (stocks.length === 0) {

        initializeManagedStocks();
    }


    var savedPrices =
        JSON.parse(
            localStorage.getItem(
                "stockPrices"
            )
        );


    if (savedPrices === null) {

        return;
    }


    for (
        var i = 0;
        i < stocks.length;
        i++
    ) {

        var symbol =
            stocks[i].symbol;


        if (
            savedPrices[symbol] !== undefined
        ) {

            stocks[i].price =
                savedPrices[symbol];


            if (
                !stocks[i].history ||
                stocks[i].history.length === 0
            ) {

                stocks[i].history = [
                    stocks[i].price
                ];
            }
        }
    }


    saveManagedStocks();
}


/* =====================================================
   6. SAVE CURRENT PRICES
===================================================== */

function saveStockPrices() {

    var data = {};


    for (
        var i = 0;
        i < stocks.length;
        i++
    ) {

        data[
            stocks[i].symbol
        ] =
            stocks[i].price;
    }


    localStorage.setItem(
        "stockPrices",
        JSON.stringify(data)
    );


    saveManagedStocks();
}


/* =====================================================
   7. GET BALANCE
===================================================== */

function getBalance() {

    var balance =
        localStorage.getItem(
            "balance"
        );


    if (balance === null) {

        balance =
            startingBalance;


        localStorage.setItem(
            "balance",
            balance
        );
    }


    return Number(balance);
}


/* =====================================================
   8. SHOW BALANCE
===================================================== */

function showBalance() {

    var balance =
        getBalance();


    var element =
        document.getElementById(
            "balance"
        );


    if (element) {

        element.innerHTML =
            "₹" +
            balance.toLocaleString(
                "en-IN"
            );
    }


    var portfolioBalance =
        document.getElementById(
            "portfolioBalance"
        );


    if (portfolioBalance) {

        portfolioBalance.innerHTML =
            "₹" +
            balance.toLocaleString(
                "en-IN"
            );
    }


    var tradeBalance =
        document.getElementById(
            "tradeBalance"
        );


    if (tradeBalance) {

        tradeBalance.innerHTML =
            "₹" +
            balance.toLocaleString(
                "en-IN"
            );
    }


    var sellingBalance =
        document.getElementById(
            "sellingBalance"
        );


    if (sellingBalance) {

        sellingBalance.innerHTML =
            "₹" +
            balance.toLocaleString(
                "en-IN"
            );
    }
}


/* =====================================================
   9. FIND STOCK
===================================================== */

function findStock(symbol) {

    for (
        var i = 0;
        i < stocks.length;
        i++
    ) {

        if (
            stocks[i].symbol === symbol
        ) {

            return stocks[i];
        }
    }


    return null;
}


/* =====================================================
   10. PERCENTAGE CHANGE
===================================================== */

function getStockChange(stock) {

    if (
        !stock.startPrice ||
        stock.startPrice === 0
    ) {

        return 0;
    }


    var change =

        (
            (
                stock.price -
                stock.startPrice
            )
            /
            stock.startPrice
        )
        * 100;


    return change;
}


/* =====================================================
   11. MARKET TABLE
===================================================== */

function loadMarketTable() {

    var table =
        document.getElementById(
            "marketTableBody"
        );


    if (!table) {

        return;
    }


    table.innerHTML =
        "";


    for (
        var i = 0;
        i < stocks.length;
        i++
    ) {

        var stock =
            stocks[i];


        var change =
            getStockChange(
                stock
            );


        var row =
            document.createElement(
                "tr"
            );


        var changeClass =
            change >= 0
                ? "positive"
                : "negative";


        var sign =
            change >= 0
                ? "+"
                : "";


        row.innerHTML =

            "<td class='market-symbol'>" +

            stock.symbol +

            "</td>" +


            "<td class='company-name'>" +

            stock.company +

            "</td>" +


            "<td class='stock-price'>" +

            "₹" +

            stock.price.toFixed(2) +

            "</td>" +


            "<td class='" +
            changeClass +
            "'>" +

            sign +

            change.toFixed(2) +

            "%</td>" +


            "<td>" +

            "<button " +

            "class='trade-button' " +

            "onclick=\"openTrade('" +
            stock.symbol +
            "')\">" +

            "Trade" +

            "</button>" +

            "</td>";


        table.appendChild(
            row
        );
    }
}


/* =====================================================
   12. CHART STOCK SELECTOR
===================================================== */

function loadChartSelector() {

    var selector =
        document.getElementById(
            "chartStockSelector"
        );


    if (!selector) {

        return;
    }


    selector.innerHTML =
        "";


    for (
        var i = 0;
        i < stocks.length;
        i++
    ) {

        var option =
            document.createElement(
                "option"
            );


        option.value =
            stocks[i].symbol;


        option.textContent =
            stocks[i].symbol +
            " - " +
            stocks[i].company;


        selector.appendChild(
            option
        );
    }


    if (stocks.length > 0) {

        selector.value =
            stocks[0].symbol;


        drawMarketChart(
            stocks[0].symbol
        );
    }
}


/* =====================================================
   13. CHANGE CHART STOCK
===================================================== */

function changeChartStock() {

    var selector =
        document.getElementById(
            "chartStockSelector"
        );


    if (!selector) {

        return;
    }


    drawMarketChart(
        selector.value
    );
}


/* =====================================================
   14. TRADE BUTTON
===================================================== */

function openTrade(symbol) {

    window.location.href =
        "trade.html?symbol=" +
        encodeURIComponent(
            symbol
        );
}


/* =====================================================
   15. LOAD TRADE PAGE
===================================================== */

function loadTradePage() {

    var params =
        new URLSearchParams(
            window.location.search
        );


    var symbol =
        params.get(
            "symbol"
        );


    if (!symbol) {

        window.location.href =
            "dashboard.html";

        return;
    }


    var stock =
        findStock(symbol);


    if (!stock) {

        window.location.href =
            "dashboard.html";

        return;
    }


    document.getElementById(
        "tradeCompany"
    ).innerHTML =
        stock.company;


    document.getElementById(
        "tradeSymbol"
    ).innerHTML =
        stock.symbol;


    document.getElementById(
        "tradePrice"
    ).innerHTML =
        "₹" +
        stock.price.toFixed(2);


    showBalance();


    calculateTradeTotal();
}


/* =====================================================
   16. CALCULATE TRADE TOTAL
===================================================== */

function calculateTradeTotal() {

    var params =
        new URLSearchParams(
            window.location.search
        );


    var symbol =
        params.get(
            "symbol"
        );


    var stock =
        findStock(symbol);


    if (!stock) {

        return;
    }


    var quantity =
        Number(
            document.getElementById(
                "tradeQuantity"
            ).value
        );


    if (
        quantity <= 0 ||
        isNaN(quantity)
    ) {

        quantity = 0;
    }


    var total =
        stock.price *
        quantity;


    var totalElement =
        document.getElementById(
            "tradeTotal"
        );


    if (totalElement) {

        totalElement.innerHTML =
            "₹" +
            total.toLocaleString(
                "en-IN",
                {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2
                }
            );
    }
}


/* =====================================================
   17. BUY SELECTED STOCK
===================================================== */

function buySelectedStock() {

    var params =
        new URLSearchParams(
            window.location.search
        );


    var symbol =
        params.get(
            "symbol"
        );


    var stock =
        findStock(symbol);


    if (!stock) {

        return;
    }


    var quantity =
        Number(
            document.getElementById(
                "tradeQuantity"
            ).value
        );


    var message =
        document.getElementById(
            "tradeMessage"
        );


    if (
        quantity <= 0 ||
        isNaN(quantity)
    ) {

        message.innerHTML =
            "Enter a valid quantity.";

        message.style.color =
            "red";

        return;
    }


    var total =
        stock.price *
        quantity;


    var balance =
        getBalance();


    if (
        total > balance
    ) {

        message.innerHTML =
            "Not enough virtual balance.";

        message.style.color =
            "red";

        return;
    }


    balance =
        balance -
        total;


    localStorage.setItem(
        "balance",
        balance
    );


    var portfolio =
        JSON.parse(
            localStorage.getItem(
                "portfolio"
            )
        ) || [];


    var found =
        false;


    for (
        var i = 0;
        i < portfolio.length;
        i++
    ) {

        if (
            portfolio[i].symbol ===
            stock.symbol
        ) {

            portfolio[i].quantity +=
                quantity;


            portfolio[i].total +=
                total;


            found =
                true;


            break;
        }
    }


    if (!found) {

        portfolio.push({

            symbol:
                stock.symbol,

            company:
                stock.company,

            quantity:
                quantity,

            price:
                stock.price,

            total:
                total
        });
    }


    localStorage.setItem(
        "portfolio",
        JSON.stringify(
            portfolio
        )
    );


    recordPortfolioValue();


    showBalance();


    message.innerHTML =
        "Purchase successful.";

    message.style.color =
        "rgb(20,190,100)";
}


/* =====================================================
   18. SHOW PORTFOLIO
   ONLY SELL BUTTON
===================================================== */

function showPortfolio() {

    var table =
        document.getElementById(
            "portfolioTable"
        );


    if (!table) {

        return;
    }


    var portfolio =
        JSON.parse(
            localStorage.getItem(
                "portfolio"
            )
        ) || [];


    table.innerHTML =
        "";


    var invested =
        0;


    var currentValue =
        0;


    var stockCount =
        0;


    for (
        var i = 0;
        i < portfolio.length;
        i++
    ) {

        var holding =
            portfolio[i];


        var stock =
            findStock(
                holding.symbol
            );


        var currentPrice =
            stock
                ? stock.price
                : holding.price;


        invested +=
            holding.total;


        currentValue +=
            currentPrice *
            holding.quantity;


        stockCount +=
            holding.quantity;


        var row =
            table.insertRow();


        /* Symbol */

        row.insertCell(0).innerHTML =

            "<strong>" +
            holding.symbol +
            "</strong>";


        /* Company */

        row.insertCell(1).innerHTML =

            holding.company;


        /* Buy Price */

        row.insertCell(2).innerHTML =

            "₹" +
            holding.price.toFixed(2);


        /* Current Price */

        row.insertCell(3).innerHTML =

            "₹" +
            currentPrice.toFixed(2);


        /* Total Invested */

        row.insertCell(4).innerHTML =

            "₹" +
            holding.total.toLocaleString(
                "en-IN"
            );


        /* Sell Button */

        var actionCell =
            row.insertCell(5);


        actionCell.innerHTML =

            "<button " +

            "class='portfolio-sell-button' " +

            "onclick=\"openSellingPage('" +

            holding.symbol +

            "')\">" +

            "Sell" +

            "</button>";
    }


    var balance =
        getBalance();


    var balanceElement =
        document.getElementById(
            "portfolioBalance"
        );


    if (balanceElement) {

        balanceElement.innerHTML =

            "₹" +
            balance.toLocaleString(
                "en-IN"
            );
    }


    var investedElement =
        document.getElementById(
            "invested"
        );


    if (investedElement) {

        investedElement.innerHTML =

            "₹" +
            invested.toLocaleString(
                "en-IN"
            );
    }


    var portfolioValueElement =
        document.getElementById(
            "portfolioValue"
        );


    if (portfolioValueElement) {

        portfolioValueElement.innerHTML =

            "₹" +
            currentValue.toLocaleString(
                "en-IN"
            );
    }


    var stockCountElement =
        document.getElementById(
            "stockCount"
        );


    if (stockCountElement) {

        stockCountElement.innerHTML =
            stockCount;
    }


    var emptyMessage =
        document.getElementById(
            "emptyMessage"
        );


    if (emptyMessage) {

        if (
            portfolio.length === 0
        ) {

            emptyMessage.innerHTML =
                "You have not bought any stocks yet.";

        }

        else {

            emptyMessage.innerHTML =
                "";
        }
    }


    drawPortfolioGraph();
}


/* =====================================================
   19. OPEN SELLING PAGE
===================================================== */

function openSellingPage(
    symbol
) {

    window.location.href =
        "selling.html?symbol=" +
        encodeURIComponent(
            symbol
        );
}


/* =====================================================
   20. LOAD SELLING PAGE
===================================================== */

function loadSellingPage() {

    var params =
        new URLSearchParams(
            window.location.search
        );


    var symbol =
        params.get(
            "symbol"
        );


    if (!symbol) {

        window.location.href =
            "portfolio.html";

        return;
    }


    var stock =
        findStock(symbol);


    var portfolio =
        JSON.parse(
            localStorage.getItem(
                "portfolio"
            )
        ) || [];


    if (!stock) {

        window.location.href =
            "portfolio.html";

        return;
    }


    var holding =
        null;


    for (
        var i = 0;
        i < portfolio.length;
        i++
    ) {

        if (
            portfolio[i].symbol ===
            symbol
        ) {

            holding =
                portfolio[i];

            break;
        }
    }


    if (!holding) {

        window.location.href =
            "portfolio.html";

        return;
    }


    var companyElement =
        document.getElementById(
            "sellingCompany"
        );


    if (companyElement) {

        companyElement.innerHTML =
            stock.company;
    }


    var symbolElement =
        document.getElementById(
            "sellingSymbol"
        );


    if (symbolElement) {

        symbolElement.innerHTML =
            stock.symbol;
    }


    var priceElement =
        document.getElementById(
            "sellingPrice"
        );


    if (priceElement) {

        priceElement.innerHTML =
            "₹" +
            stock.price.toFixed(2);
    }


    var quantityElement =
        document.getElementById(
            "ownedQuantity"
        );


    if (quantityElement) {

        quantityElement.innerHTML =
            holding.quantity;
    }


    var balanceElement =
        document.getElementById(
            "sellingBalance"
        );


    if (balanceElement) {

        balanceElement.innerHTML =
            "₹" +
            getBalance().toLocaleString(
                "en-IN"
            );
    }


    var quantityInput =
        document.getElementById(
            "sellingQuantity"
        );


    if (quantityInput) {

        quantityInput.max =
            holding.quantity;


        quantityInput.value =
            1;
    }


    calculateSellingTotal();
}


/* =====================================================
   21. CALCULATE SELLING TOTAL
===================================================== */

function calculateSellingTotal() {

    var params =
        new URLSearchParams(
            window.location.search
        );


    var symbol =
        params.get(
            "symbol"
        );


    var stock =
        findStock(symbol);


    if (!stock) {

        return;
    }


    var quantityInput =
        document.getElementById(
            "sellingQuantity"
        );


    if (!quantityInput) {

        return;
    }


    var quantity =
        Number(
            quantityInput.value
        );


    if (
        quantity <= 0 ||
        isNaN(quantity)
    ) {

        quantity = 0;
    }


    var total =
        stock.price *
        quantity;


    var totalElement =
        document.getElementById(
            "sellingTotal"
        );


    if (totalElement) {

        totalElement.innerHTML =
            "₹" +
            total.toLocaleString(
                "en-IN",
                {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2
                }
            );
    }
}


/* =====================================================
   22. CONFIRM SELL
===================================================== */

function confirmSell() {

    var params =
        new URLSearchParams(
            window.location.search
        );


    var symbol =
        params.get(
            "symbol"
        );


    var stock =
        findStock(symbol);


    var portfolio =
        JSON.parse(
            localStorage.getItem(
                "portfolio"
            )
        ) || [];


    var message =
        document.getElementById(
            "sellingMessage"
        );


    if (!stock) {

        return;
    }


    var quantityInput =
        document.getElementById(
            "sellingQuantity"
        );


    if (!quantityInput) {

        return;
    }


    var quantity =
        Number(
            quantityInput.value
        );


    var holding =
        null;


    var holdingIndex =
        -1;


    for (
        var i = 0;
        i < portfolio.length;
        i++
    ) {

        if (
            portfolio[i].symbol ===
            symbol
        ) {

            holding =
                portfolio[i];


            holdingIndex =
                i;


            break;
        }
    }


    if (!holding) {

        if (message) {

            message.innerHTML =
                "This stock is not in your portfolio.";

            message.style.color =
                "rgb(240,65,75)";
        }


        return;
    }


    if (
        quantity <= 0 ||
        isNaN(quantity)
    ) {

        if (message) {

            message.innerHTML =
                "Enter a valid quantity.";

            message.style.color =
                "rgb(240,65,75)";
        }


        return;
    }


    if (
        quantity >
        holding.quantity
    ) {

        if (message) {

            message.innerHTML =
                "You cannot sell more stocks than you own.";

            message.style.color =
                "rgb(240,65,75)";
        }


        return;
    }


    var currentPrice =
        stock.price;


    var moneyReceived =
        currentPrice *
        quantity;


    var balance =
        getBalance();


    balance +=
        moneyReceived;


    localStorage.setItem(
        "balance",
        balance
    );


    /*
       Calculate the average buy price.
       This keeps the remaining investment correct.
    */

    var averageBuyPrice =

        holding.total /
        holding.quantity;


    holding.quantity -=
        quantity;


    holding.total -=

        averageBuyPrice *
        quantity;


    if (
        holding.quantity ===
        0
    ) {

        portfolio.splice(
            holdingIndex,
            1
        );
    }


    localStorage.setItem(
        "portfolio",
        JSON.stringify(
            portfolio
        )
    );


    recordPortfolioValue();


    if (message) {

        message.innerHTML =

            "Successfully sold " +
            quantity +
            " share(s) of " +
            stock.symbol +
            " for ₹" +
            moneyReceived.toLocaleString(
                "en-IN"
            );


        message.style.color =
            "rgb(20,190,100)";
    }


    var balanceElement =
        document.getElementById(
            "sellingBalance"
        );


    if (balanceElement) {

        balanceElement.innerHTML =
            "₹" +
            balance.toLocaleString(
                "en-IN"
            );
    }


    /*
       Return to Portfolio after success.
    */

    setTimeout(

        function() {

            window.location.href =
                "portfolio.html";

        },

        1200
    );
}


/* =====================================================
   23. RECORD PORTFOLIO HISTORY
===================================================== */

function recordPortfolioValue() {

    var portfolio =
        JSON.parse(
            localStorage.getItem(
                "portfolio"
            )
        ) || [];


    var value =
        getBalance();


    for (
        var i = 0;
        i < portfolio.length;
        i++
    ) {

        var stock =
            findStock(
                portfolio[i].symbol
            );


        if (stock) {

            value +=

                stock.price *
                portfolio[i].quantity;
        }
    }


    var history =
        JSON.parse(
            localStorage.getItem(
                "portfolioHistory"
            )
        ) || [];


    history.push({

        time:
            new Date().toLocaleTimeString(),

        value:
            value
    });


    if (
        history.length > 30
    ) {

        history.shift();
    }


    localStorage.setItem(
        "portfolioHistory",
        JSON.stringify(
            history
        )
    );
}


/* =====================================================
   24. MARKET CHART
===================================================== */

function drawMarketChart(symbol) {

    var canvas =
        document.getElementById(
            "marketChart"
        );


    if (!canvas) {

        return;
    }


    var stock =
        findStock(symbol);


    if (!stock) {

        return;
    }


    var ctx =
        canvas.getContext(
            "2d"
        );


    var width =
        canvas.width;


    var height =
        canvas.height;


    ctx.clearRect(
        0,
        0,
        width,
        height
    );


    var data =

        stock.history &&
        stock.history.length > 1

            ? stock.history

            : [
                stock.price
            ];


    var min =
        Math.min.apply(
            null,
            data
        );


    var max =
        Math.max.apply(
            null,
            data
        );


    if (
        min === max
    ) {

        min -= 5;

        max += 5;
    }


    /* Grid */

    ctx.strokeStyle =
        "rgba(100,120,150,0.15)";

    ctx.lineWidth =
        1;


    for (
        var i = 0;
        i < 6;
        i++
    ) {

        var y =
            40 +
            (
                i *
                (
                    height - 80
                ) /
                5
            );


        ctx.beginPath();

        ctx.moveTo(
            50,
            y
        );

        ctx.lineTo(
            width - 25,
            y
        );

        ctx.stroke();
    }


    var points = [];


    for (
        var i = 0;
        i < data.length;
        i++
    ) {

        var x =

            50 +

            (
                i /
                Math.max(
                    data.length - 1,
                    1
                )
            ) *
            (
                width - 85
            );


        var y =

            (
                height - 45
            )

            -

            (
                (
                    data[i] -
                    min
                )
                /
                (
                    max -
                    min
                )
            )

            *
            (
                height - 85
            );


        points.push({

            x: x,

            y: y

        });
    }


    /* Area */

    var gradient =
        ctx.createLinearGradient(
            0,
            0,
            0,
            height
        );


    gradient.addColorStop(
        0,
        "rgba(37,99,235,0.35)"
    );


    gradient.addColorStop(
        1,
        "rgba(37,99,235,0)"
    );


    ctx.beginPath();


    ctx.moveTo(
        points[0].x,
        height - 45
    );


    for (
        var i = 0;
        i < points.length;
        i++
    ) {

        ctx.lineTo(
            points[i].x,
            points[i].y
        );
    }


    ctx.lineTo(
        points[
            points.length - 1
        ].x,

        height - 45
    );


    ctx.closePath();


    ctx.fillStyle =
        gradient;


    ctx.fill();


    /* Line */

    ctx.beginPath();


    for (
        var i = 0;
        i < points.length;
        i++
    ) {

        if (
            i === 0
        ) {

            ctx.moveTo(
                points[i].x,
                points[i].y
            );

        }

        else {

            ctx.lineTo(
                points[i].x,
                points[i].y
            );
        }
    }


    ctx.strokeStyle =
        "#3b82f6";


    ctx.lineWidth =
        3;


    ctx.stroke();


    /* Last point */

    var last =
        points[
            points.length - 1
        ];


    ctx.beginPath();


    ctx.arc(
        last.x,
        last.y,
        5,
        0,
        Math.PI * 2
    );


    ctx.fillStyle =
        "#22c55e";


    ctx.fill();


    /* Price labels */

    ctx.fillStyle =
        "#8da0bf";


    ctx.font =
        "12px Arial";


    for (
        var i = 0;
        i < 5;
        i++
    ) {

        var price =

            max -

            (
                i *
                (
                    max - min
                ) /
                4
            );


        var y =

            44 +

            (
                i *
                (
                    height - 89
                ) /
                4
            );


        ctx.fillText(

            "₹" +
            price.toFixed(2),

            width - 75,

            y
        );
    }


    /* Header values */

    var chartName =
        document.getElementById(
            "chartStockName"
        );


    var chartPrice =
        document.getElementById(
            "chartCurrentPrice"
        );


    var chartChange =
        document.getElementById(
            "chartCurrentChange"
        );


    if (chartName) {

        chartName.innerHTML =

            stock.company +
            " (" +
            stock.symbol +
            ")";
    }


    if (chartPrice) {

        chartPrice.innerHTML =
            "₹" +
            stock.price.toFixed(2);
    }


    if (chartChange) {

        var change =
            getStockChange(
                stock
            );


        chartChange.innerHTML =

            (
                change >= 0
                    ? "+"
                    : ""
            ) +

            change.toFixed(2) +

            "%";


        chartChange.style.color =

            change >= 0

                ? "rgb(20,190,100)"

                : "rgb(240,65,75)";
    }
}


/* =====================================================
   25. PORTFOLIO GRAPH
===================================================== */

function drawPortfolioGraph() {

    var canvas =
        document.getElementById(
            "portfolioGraph"
        );


    if (!canvas) {

        return;
    }


    var history =
        JSON.parse(
            localStorage.getItem(
                "portfolioHistory"
            )
        ) || [];


    if (
        history.length === 0
    ) {

        history = [

            {
                value:
                    getBalance()
            },

            {
                value:
                    getBalance()
            }

        ];
    }


    var data =
        history.map(

            function(item) {

                return item.value;

            }
        );


    var ctx =
        canvas.getContext(
            "2d"
        );


    var width =
        canvas.width;


    var height =
        canvas.height;


    ctx.clearRect(
        0,
        0,
        width,
        height
    );


    var min =
        Math.min.apply(
            null,
            data
        );


    var max =
        Math.max.apply(
            null,
            data
        );


    if (
        min === max
    ) {

        min -= 100;

        max += 100;
    }


    /* Grid */

    ctx.strokeStyle =
        "rgba(100,120,150,0.15)";


    for (
        var i = 0;
        i < 6;
        i++
    ) {

        var y =

            40 +

            (
                i *
                (
                    height - 80
                ) /
                5
            );


        ctx.beginPath();

        ctx.moveTo(
            50,
            y
        );

        ctx.lineTo(
            width - 25,
            y
        );

        ctx.stroke();
    }


    var points = [];


    for (
        var i = 0;
        i < data.length;
        i++
    ) {

        var x =

            50 +

            (
                i /
                Math.max(
                    data.length - 1,
                    1
                )
            )

            *
            (
                width - 85
            );


        var y =

            (
                height - 45
            )

            -

            (
                (
                    data[i] -
                    min
                )
                /
                (
                    max -
                    min
                )
            )

            *
            (
                height - 85
            );


        points.push({

            x: x,

            y: y

        });
    }


    /* Area */

    var gradient =
        ctx.createLinearGradient(
            0,
            0,
            0,
            height
        );


    gradient.addColorStop(
        0,
        "rgba(34,197,94,0.30)"
    );


    gradient.addColorStop(
        1,
        "rgba(34,197,94,0)"
    );


    ctx.beginPath();


    ctx.moveTo(
        points[0].x,
        height - 45
    );


    for (
        var i = 0;
        i < points.length;
        i++
    ) {

        ctx.lineTo(
            points[i].x,
            points[i].y
        );
    }


    ctx.lineTo(
        points[
            points.length - 1
        ].x,

        height - 45
    );


    ctx.closePath();


    ctx.fillStyle =
        gradient;


    ctx.fill();


    /* Line */

    ctx.beginPath();


    for (
        var i = 0;
        i < points.length;
        i++
    ) {

        if (
            i === 0
        ) {

            ctx.moveTo(
                points[i].x,
                points[i].y
            );

        }

        else {

            ctx.lineTo(
                points[i].x,
                points[i].y
            );
        }
    }


    ctx.strokeStyle =
        "#22c55e";


    ctx.lineWidth =
        3;


    ctx.stroke();


    /* Last point */

    var last =
        points[
            points.length - 1
        ];


    ctx.beginPath();


    ctx.arc(
        last.x,
        last.y,
        5,
        0,
        Math.PI * 2
    );


    ctx.fillStyle =
        "#22c55e";


    ctx.fill();


    /* Price labels */

    ctx.fillStyle =
        "#8da0bf";


    ctx.font =
        "12px Arial";


    for (
        var i = 0;
        i < 5;
        i++
    ) {

        var value =

            max -

            (
                i *
                (
                    max - min
                ) /
                4
            );


        var y =

            44 +

            (
                i *
                (
                    height - 89
                ) /
                4
            );


        ctx.fillText(

            "₹" +

            value.toLocaleString(
                "en-IN",
                {
                    maximumFractionDigits: 0
                }
            ),

            width - 90,

            y
        );
    }
}


/* =====================================================
   26. STOCK PRICE SIMULATION
===================================================== */

function updateStockPrices() {

    for (
        var i = 0;
        i < stocks.length;
        i++
    ) {

        var stock =
            stocks[i];


        var change =

            (
                Math.random() * 2
            )

            - 1;


        stock.price =

            stock.price +
            change;


        if (
            stock.price < 1
        ) {

            stock.price =
                1;
        }


        stock.price =

            Number(
                stock.price.toFixed(2)
            );


        if (!stock.history) {

            stock.history = [];
        }


        stock.history.push(
            stock.price
        );


        if (
            stock.history.length >
            30
        ) {

            stock.history.shift();
        }
    }


    saveStockPrices();


    loadMarketTable();


    var selector =
        document.getElementById(
            "chartStockSelector"
        );


    if (selector) {

        drawMarketChart(
            selector.value
        );
    }


    showPortfolio();


    recordPortfolioValue();


    drawPortfolioGraph();


    loadStocks();


    showStocks();


    /*
       Also refresh selling page
       if currently opened.
    */

    if (
        document.getElementById(
            "sellingPrice"
        )
    ) {

        loadSellingPage();
    }
}


/* =====================================================
   27. START SIMULATION
===================================================== */

var simulationStarted =
    false;


function startStockSimulation() {

    if (
        simulationStarted
    ) {

        return;
    }


    simulationStarted =
        true;


    var selector =
        document.getElementById(
            "chartStockSelector"
        );


    if (selector) {

        drawMarketChart(
            selector.value
        );
    }


    setInterval(

        function() {

            updateStockPrices();

        },

        3000
    );
}


/* =====================================================
   28. COMPETITION
===================================================== */

function joinCompetition(
    name
) {

    var message =
        document.getElementById(
            "competitionMessage"
        );


    if (!message) {

        return;
    }


    message.innerHTML =
        "You joined " +
        name +
        "!";


    message.style.color =
        "green";


    localStorage.setItem(
        "joinedCompetition",
        name
    );
}


/* =====================================================
   29. ADMIN - LOAD USERS
===================================================== */

function loadUsers() {

    var users =
        JSON.parse(
            localStorage.getItem(
                "users"
            )
        ) || [];


    var userCount =
        document.getElementById(
            "userCount"
        );


    if (userCount) {

        userCount.innerHTML =
            users.length;
    }


    var table =
        document.getElementById(
            "userTable"
        );


    if (!table) {

        return;
    }


    table.innerHTML =
        "";


    for (
        var i = 0;
        i < users.length;
        i++
    ) {

        var row =
            document.createElement(
                "tr"
            );


        row.innerHTML =

            "<td>" +
            (i + 1) +
            "</td>" +

            "<td>" +
            users[i].username +
            "</td>" +

            "<td>" +
            users[i].email +
            "</td>" +

            "<td>User</td>";


        table.appendChild(
            row
        );
    }
}


/* =====================================================
   30. ADMIN - LOAD STOCKS
===================================================== */

function loadStocks() {

    var table =
        document.getElementById(
            "stockTable"
        );


    if (!table) {

        return;
    }


    table.innerHTML =
        "";


    var stockCount =
        document.getElementById(
            "stockCount"
        );


    if (stockCount) {

        stockCount.innerHTML =
            stocks.length;
    }


    for (
        var i = 0;
        i < stocks.length;
        i++
    ) {

        var row =
            document.createElement(
                "tr"
            );


        row.innerHTML =

            "<td>" +
            (i + 1) +
            "</td>" +

            "<td>" +
            stocks[i].symbol +
            "</td>" +

            "<td>" +
            stocks[i].company +
            "</td>" +

            "<td>₹" +
            stocks[i].price.toFixed(2) +
            "</td>";


        table.appendChild(
            row
        );
    }
}


/* =====================================================
   31. STOCK MANAGER - SHOW STOCKS
===================================================== */

function showStocks() {

    var table =
        document.getElementById(
            "stockTableBody"
        );


    if (!table) {

        return;
    }


    table.innerHTML =
        "";


    for (
        var i = 0;
        i < stocks.length;
        i++
    ) {

        var row =
            document.createElement(
                "tr"
            );


        row.innerHTML =

            "<td>" +
            (i + 1) +
            "</td>" +

            "<td>" +
            stocks[i].symbol +
            "</td>" +

            "<td>" +
            stocks[i].company +
            "</td>" +

            "<td>" +

            "<input " +
            "type='number' " +
            "id='price" +
            i +
            "' " +
            "value='" +
            stocks[i].price +
            "'>" +

            "</td>" +

            "<td>" +

            "<button " +
            "class='update-button' " +
            "onclick='updatePrice(" +
            i +
            ")'>" +

            "Update" +

            "</button>" +

            "<button " +
            "class='delete-button' " +
            "onclick='deleteStock(" +
            i +
            ")'>" +

            "Delete" +

            "</button>" +

            "</td>";


        table.appendChild(
            row
        );
    }
}


/* =====================================================
   32. STOCK MANAGER - ADD STOCK
===================================================== */

function addStock() {

    var symbol =
        document.getElementById(
            "stockName"
        ).value
        .trim()
        .toUpperCase();


    var price =
        Number(
            document.getElementById(
                "stockPrice"
            ).value
        );


    if (
        symbol === "" ||
        price <= 0 ||
        isNaN(price)
    ) {

        alert(
            "Enter valid stock symbol and price."
        );

        return;
    }


    for (
        var i = 0;
        i < stocks.length;
        i++
    ) {

        if (
            stocks[i].symbol ===
            symbol
        ) {

            alert(
                "Stock already exists."
            );

            return;
        }
    }


    var company =
        prompt(
            "Enter company name:"
        );


    if (
        company === null ||
        company.trim() === ""
    ) {

        return;
    }


    stocks.push({

        symbol:
            symbol,

        company:
            company.trim(),

        price:
            price,

        startPrice:
            price,

        history:
            [price]

    });


    saveManagedStocks();


    saveStockPrices();


    document.getElementById(
        "stockName"
    ).value =
        "";


    document.getElementById(
        "stockPrice"
    ).value =
        "";


    showStocks();


    loadStocks();


    loadMarketTable();


    loadChartSelector();


    alert(
        "Stock added successfully."
    );
}


/* =====================================================
   33. STOCK MANAGER - UPDATE
===================================================== */

function updatePrice(
    index
) {

    var input =
        document.getElementById(
            "price" +
            index
        );


    if (!input) {

        return;
    }


    var newPrice =
        Number(
            input.value
        );


    if (
        newPrice <= 0 ||
        isNaN(newPrice)
    ) {

        alert(
            "Enter a valid price."
        );

        return;
    }


    stocks[index].price =
        newPrice;


    if (!stocks[index].history) {

        stocks[index].history = [];
    }


    stocks[index].history.push(
        newPrice
    );


    if (
        stocks[index].history.length >
        30
    ) {

        stocks[index].history.shift();
    }


    saveManagedStocks();


    saveStockPrices();


    showStocks();


    loadStocks();


    loadMarketTable();


    loadChartSelector();


    alert(
        "Stock price updated."
    );
}


/* =====================================================
   34. STOCK MANAGER - DELETE
===================================================== */

function deleteStock(
    index
) {

    var result =
        confirm(
            "Delete this stock?"
        );


    if (!result) {

        return;
    }


    stocks.splice(
        index,
        1
    );


    saveManagedStocks();


    saveStockPrices();


    showStocks();


    loadStocks();


    loadMarketTable();


    loadChartSelector();
}


/* =====================================================
   35. LOGOUT
===================================================== */

function logout() {

    localStorage.removeItem(
        "loggedIn"
    );


    localStorage.removeItem(
        "currentUser"
    );


    localStorage.removeItem(
        "adminLoggedIn"
    );


    localStorage.removeItem(
        "stockManagerLoggedIn"
    );


    window.location.href =
        "home.html";
}


/* =====================================================
   36. RESET PROJECT
===================================================== */

function resetBalance() {

    localStorage.removeItem(
        "balance"
    );


    localStorage.removeItem(
        "portfolio"
    );


    localStorage.removeItem(
        "portfolioHistory"
    );


    localStorage.removeItem(
        "stockPrices"
    );


    localStorage.removeItem(
        "joinedCompetition"
    );


    alert(
        "Trading project reset. Starting again with ₹1,00,000."
    );


    location.reload();
}


/* =====================================================
   37. PAGE INITIALIZATION
===================================================== */

document.addEventListener(
    "DOMContentLoaded",
    function() {

        initializeManagedStocks();

        loadSavedPrices();

        loadUsers();

        loadStocks();

        showStocks();

    }
);