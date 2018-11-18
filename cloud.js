const Telegraf = require('telegraf');
const Extra = require('telegraf/extra');
const Markup = require('telegraf/markup');
const bot = new Telegraf("643988085:AAEHKlBaXqvlVc-AY_RnIuUavdbU8vNw1wA");
const Scene = require('telegraf/scenes/base')
const session = require('telegraf/session')
const Stage = require('telegraf/stage')
const { enter,leave } = Stage
var rest = require('restler');
var btc='d63b2e5d-4e54-5990-943f-ef5788433df1'
var rates = require("bitcoin-exchange-rates");
var cron = require('node-cron');
var mysql = require('mysql');
var WAValidator = require('wallet-address-validator');
var coinbase = require('coinbase');
var Coinbase = require('coinbase');
var Client = require('coinbase').Client;
var mysecret = '8eDpUW9PJ7E16xlns9msu5vUNxth9G0A'
var mykey = 'JaH2VY37PArRPeod'
var sb = require('satoshi-bitcoin');
var client = new Client({'apiKey': mykey, 'apiSecret': mysecret});
var con = mysql.createConnection({
    host: "bfy5zyaq3-mysql.services.clever-cloud.com",
    user: "u60ivexyvx156dn2",
    password: "GycKdUcY1k3Ef2ZKxbS",
    database:"bfy5zyaq3"
});
var rn = require('random-number');
var options = {
    min:  1
    , max:  100
    , integer: true
}
//server

const {createServer} = require('http')
const server = createServer(() => {})
server.listen(3000)
con.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
});

//catch error
bot.catch((err) => {
    console.log('Ooops', err)
})



//menu refferal start

bot.use(Telegraf.log());





//start
bot.command('start',ctx => {
    var message = ctx.message;
    var id = ctx.from.id;
    var start = '/start';
    con.query("SELECT id FROM account WHERE id=" + id, function (err, result, fields) {
    if (message.text == start&&result.length<=0) {
                var chatid = ctx.from.id;
                var firstname = ctx.from.first_name;
                var bal = 0;
                var tim = new Date();
                var address = 'none';
                var refa = 411002680;
                var user = {id: chatid, balance: bal, firstname: firstname, time: tim, withdrawadd: address, ref: refa};
                con.query("insert into `account` SET ?", user, function (error, results) {
                    ctx.reply('welcome ' + ctx.from.first_name + ' to Bithen.\nhere you can:\n 🔸breed hens 🐔 \n🔸collect eggs 🥚 and \n🔸earn real money 💵 in BTC', Markup
                        .keyboard([
                            ['🐔Hens', '🥚Farm'], // Row1 with 2 buttons
                            ['💵Balance', '👨‍👧‍👦Refferals'], // Row2 with 2 buttons
                            ['🎪Marketplace', '📈Stastistics'],
                            ['⚙️Settings', '🎁Bonus'],
                            ['💬Chat']// Row3 with 3 buttons Row3 with 3 buttons
                        ])

                        .resize()
                        .extra())
                })

            } else if (message.text.split(start)[1] == id) {
                ctx.reply('🚫You cannot refer yourself', Markup
                    .keyboard([
                        ['🐔Hens', '🥚Farm'], // Row1 with 2 buttons
                        ['💵Balance', '👨‍👧‍👦Refferals'], // Row2 with 2 buttons
                        ['🎪Marketplace', '📈Stastistics'],
                        ['⚙️Settings', '🎁Bonus'],
                        ['💬Chat']// Row3 with 3 but// // Row3 with 3 buttons Row3 with 3 buttons
                    ])

                    .resize()
                    .extra())
            } else if (message.text.split(start)[1] !== id) {

                var chatd = ctx.from.id
                con.query("SELECT id FROM account WHERE id=" + chatd, function (err, result, fields) {
                    console.log(result.length)
                    if (result.length == 0) {

                        var chatidi = ctx.from.id;
                        var firstnamee = ctx.from.first_name;
                        var bala = 0;
                        var time = new Date();
                        var addresse = 'none';
                        var refidi = message.text.split(start)[1]
                        var useri = {
                            id: chatidi,
                            balance: bala,
                            firstname: firstnamee,
                            time: time,
                            withdrawadd: addresse,
                            ref: refidi
                        };
                        con.query("insert into `account` SET ?", useri)

                        var chatd = ctx.from.id
                        con.query("SELECT ref FROM account WHERE id=" + chatd, function (err, result, fields) {

                            if (result[0].ref !== refidi) {
                                var refbonus = 100;
                                var ref = 1;
                                var refid = message.text.split(start)[1];

                                var sql = "update `account` set `balance` =`balance`+" + refbonus + ", `friends`=`friends`+ '" + ref + "' where `id` = '" + refid + "'";

                                con.query(sql)

                                ctx.reply('welcome ' + ctx.from.first_name + ' to Bithen.\nhere you can:\n 🔸breed hens 🐔 \n🔸collect eggs 🥚 and \n🔸earn real money 💵 in BTC', Markup
                                    .keyboard([
                                        ['🐔Hens', '🥚Farm'], // Row1 with 2 buttons
                                        ['💵Balance', '👨‍👧‍👦Refferals'], // Row2 with 2 buttons
                                        ['🎪Marketplace', '📈Stastistics'],
                                        ['⚙️Settings', '🎁Bonus'],
                                        ['💬Chat']// Row3 with 3 but// Row3 with 3 buttons Row3 with 3 buttons
                                    ])

                                    .resize()
                                    .extra())
                                con.query("SELECT id FROM account WHERE id=" + refid, function (err, result, fields) {
                                    ctx.telegram.sendMessage(result[0].id, 'you have a new refferal\nyou receive:+100 💰')


                                })
                            }
                        })

                    } else if (result.length > 0) {
                        var rd = ctx.from.id
                        con.query("SELECT ref FROM account WHERE id=" + rd, function (err, result, fields) {
                            if (result[0].ref == ctx.message.text.split(start)[1]) {
                                ctx.reply('🚫you have already used this link', Markup
                                    .keyboard([
                                        ['🐔Hens', '🥚Farm'], // Row1 with 2 buttons
                                        ['💵Balance', '👨‍👧‍👦Refferals'], // Row2 with 2 buttons
                                        ['🎪Marketplace', '📈Stastistics'],
                                        ['⚙️Settings', '🎁Bonus'],
                                        ['💬Chat']// Row3 with 3 but/// Row3 with 3 buttons Row3 with 3 buttons
                                    ])

                                    .resize()
                                    .extra())
                            } else if (result[0].ref !== ctx.message.text.split(start)[1]) {
                                ctx.reply('???', Markup
                                    .keyboard([
                                        ['🐔Hens', '🥚Farm'], // Row1 with 2 buttons
                                        ['💵Balance', '👨‍👧‍👦Refferals'], // Row2 with 2 buttons
                                        ['🎪Marketplace', '📈Stastistics'],
                                        ['⚙️Settings', '🎁Bonus'],
                                        ['💬Chat']// Row3 with 3 but/// Row3 with 3 buttons Row3 with 3 buttons
                                    ])

                                    .resize()
                                    .extra())
                            }
                        })
                    }
                })
            }
        })
    })


//hens
bot.hears('🐔Hens',ctx => {
    ctx.replyWithHTML('<b>Hire Hens</b>\n\nHere you can hire Hens.The hens will be producing 🥚eggs which you need to collect on the farm.\n in the marketplace the collected eggs can be converted into game currency which you can use to buy new Hens and withdraw funds to your BTC wallet ',Extra
        .HTML()
        .markup((m) => m.inlineKeyboard([
            m.callbackButton('Buy Hens🐔', 'Buy Hens🐔'),
            m.callbackButton('My Hens🐔', 'My Hens🐔')
        ], { columns: 1 })))
})

bot.action('Buy Hens🐔',ctx=> {
    {
        ctx.replyWithPhoto({url: 'https://cdn.glitch.com/a8ee10b2-ecac-4079-8fec-9df07981d2b2%2Fimages%20(3).jpg?1541782307063'},
            Extra.load({caption: 'Chick\n\n worth: 499 💰\nproduction: 35 🥚 per hour'})
                .markdown()
                .markup((m) =>
                    m.inlineKeyboard([
                        m.callbackButton('➕Buy chick', '➕Buy chick')
                    ])
                )
        ).then(() => {
            ctx.replyWithPhoto({url: 'https://cdn.glitch.com/a8ee10b2-ecac-4079-8fec-9df07981d2b2%2Fimages%20(3).png?1541782306729'},
                Extra.load({caption: 'brown\n\n worth: 5000 💰\nproduction: 400 🥚 per hour'})
                    .markdown()
                    .markup((m) =>
                        m.inlineKeyboard([
                            m.callbackButton('➕Buy brown', '➕Buy brown')
                        ])
                    )
            ).then(() => {
                ctx.replyWithPhoto({url: 'https://cdn.glitch.com/a8ee10b2-ecac-4079-8fec-9df07981d2b2%2Fimages.jpg?1541782307816'},
                    Extra.load({caption: 'yellow\n\n worth: 29000 💰\nproduction: 1980 🥚 per hour'})
                        .markdown()
                        .markup((m) =>
                            m.inlineKeyboard([
                                m.callbackButton('➕Buy yellow', '➕Buy yellow')
                            ])
                        )
                ).then(() => {
                    ctx.replyWithPhoto({url: 'https://cdn.glitch.com/a8ee10b2-ecac-4079-8fec-9df07981d2b2%2Fimages%20(2).png?1541782306671'},
                        Extra.load({caption: 'cocky\n\n worth: 100 000 💰\nproduction: 9990 🥚 per hour'})
                            .markdown()
                            .markup((m) =>
                                m.inlineKeyboard([
                                    m.callbackButton('➕Buy cocky', '➕Buy cocky')
                                ])
                            )
                    ).then(() => {
                        ctx.replyWithPhoto({url: 'https://cdn.glitch.com/a8ee10b2-ecac-4079-8fec-9df07981d2b2%2Fdownload.jpg?1541782306360'},
                            Extra.load({caption: 'whity\n\n worth: 250 000 💰\nproduction: 25 025 🥚 per hour'})
                                .markdown()
                                .markup((m) =>
                                    m.inlineKeyboard([
                                        m.callbackButton('➕Buy whity', '➕Buy whity')
                                    ])
                                )
                        ).then(() => {
                            ctx.replyWithPhoto({url: 'https://cdn.glitch.com/a8ee10b2-ecac-4079-8fec-9df07981d2b2%2Fimages%20(2).jpg?1541782306437'},
                                Extra.load({caption: 'super\n\n worth: 500 000 💰\nproduction: 66 000 🥚 per hour'})
                                    .markdown()
                                    .markup((m) =>
                                        m.inlineKeyboard([
                                            m.callbackButton('➕Buy super', '➕Buy super')
                                        ])
                                    )
                            ).then(()=>{
                                ctx.reply('click 🏠Menu to go back to main menu',Markup
                                    .keyboard([
                                        ['🏠Menu'], // Row1 with 2 buttons
                                    ])

                                    .resize()
                                    .extra())

                        })


                        })
                    })
                })
            })
        })
    }
})
//buy hens

//chick
bot.action('➕Buy chick',ctx =>{
var user=ctx.from.id
    var sql = "SELECT `balance` from `account` where `id` = '" + user + "'";
    con.query(sql, function(error, results, fields) {
        if (results[0].balance>=499){
            var amount=499;
            var chick=1;
            var sqli = "update `account` set `balance` = `balance`-" + amount + ", `chick` = `chick`+'" + chick + "' where `id` = '" + user + "'";
con.query(sqli,function (err,result) {
    ctx.replyWithHTML('<b>💫Success</b>\n\n<b>chick</b> has been purchased,now you need to go to the farm and collect eggs produced by the hen.You can buy as many different or identical hens as you like!')

})


        }else {
            ctx.answerCbQuery(`you dont have enough funds to ${ctx.match}`)
        }
    })



})

//brown
bot.action('➕Buy brown',ctx =>{
    var user=ctx.from.id
    var sql = "SELECT `balance` from `account` where `id` = '" + user + "'";
    con.query(sql, function(error, results, fields) {
        if (results[0].balance>=5000){
            var amount=5000;
            var chick=1;
            var sqli = "update `account` set `balance` = `balance`-" + amount + ", `brown` = `brown`+'" + chick + "' where `id` = '" + user + "'";
            con.query(sqli,function (err,result) {
                ctx.replyWithHTML('<b>💫Success</b>\n\n<b>brown</b> has been purchased,now you need to go to the farm and collect eggs produced by the hen.You can buy as many different or identical hens as you like!')

            })


        }else {
            ctx.answerCbQuery(`you dont have enough funds to ${ctx.match}`)
        }
    })



})
//yellow
bot.action('➕Buy yellow',ctx =>{
    var user=ctx.from.id
    var sql = "SELECT `balance` from `account` where `id` = '" + user + "'";
    con.query(sql, function(error, results, fields) {
        if (results[0].balance>=29000){
            var amount=29000;
            var chick=1;
            var sqli = "update `account` set `balance` = `balance`-" + amount + ", `yellow` = `yellow`+'" + chick + "' where `id` = '" + user + "'";
            con.query(sqli,function (err,result) {
                ctx.replyWithHTML('<b>💫Success</b>\n\n<b>yellow</b> has been purchased,now you need to go to the farm and collect eggs produced by the hen.You can buy as many different or identical hens as you like!')

            })


        }else {
            ctx.answerCbQuery(`you dont have enough funds to ${ctx.match}`)
        }
    })



})
//cocky
bot.action('➕Buy cocky',ctx =>{
    var user=ctx.from.id
    var sql = "SELECT `balance` from `account` where `id` = '" + user + "'";
    con.query(sql, function(error, results, fields) {
        if (results[0].balance>=100000){
            var amount=100000;
            var chick=1;
            var sqli = "update `account` set `balance` = `balance`-" + amount + ", `cocky` = `cocky`+'" + chick + "' where `id` = '" + user + "'";
            con.query(sqli,function (err,result) {
                ctx.replyWithHTML('<b>💫Success</b>\n\n<b>cocky</b> has been purchased,now you need to go to the farm and collect eggs produced by the hen.You can buy as many different or identical hens as you like!')

            })


        }else {
            ctx.answerCbQuery(`you dont have enough funds to ${ctx.match}`)
        }
    })



})
//whity
bot.action('➕Buy whity',ctx =>{
    var user=ctx.from.id
    var sql = "SELECT `balance` from `account` where `id` = '" + user + "'";
    con.query(sql, function(error, results, fields) {
        if (results[0].balance>=250000){
            var amount=250000;
            var chick=1;
            var sqli = "update `account` set `balance` = `balance`-" + amount + ", `whity` = `whity`+'" + chick + "' where `id` = '" + user + "'";
            con.query(sqli,function (err,result) {
                ctx.replyWithHTML('<b>💫Success</b>\n\n<b>whity</b> has been purchased,now you need to go to the farm and collect eggs produced by the hen.You can buy as many different or identical hens as you like!')

            })


        }else {
            ctx.answerCbQuery(`you dont have enough funds to ${ctx.match}`)
        }
    })



})
//super
bot.action('➕Buy super',ctx =>{
    var user=ctx.from.id
    var sql = "SELECT `balance` from `account` where `id` = '" + user + "'";
    con.query(sql, function(error, results, fields) {
        if (results[0].balance>=500000){
            var amount=500000;
            var chick=1;
            var sqli = "update `account` set `balance` = `balance`-" + amount + ", `super` = `super`+'" + chick + "' where `id` = '" + user + "'";
            con.query(sqli,function (err,result) {
                ctx.replyWithHTML('<b>💫Success</b>\n\n<b>super</b> has been purchased,now you need to go to the farm and collect eggs produced by the hen.You can buy as many different or identical hens as you like!')

            })


        }else {
            ctx.answerCbQuery(`you dont have enough funds to ${ctx.match}`)
        }
    })



})





















//mainmenu
bot.hears('🏠Menu',ctx => {
    ctx.reply('Main menu', Markup
        .keyboard([
            ['🐔Hens','🥚Farm'], // Row1 with 2 buttons
            ['💵Balance', '👨‍👧‍👦Refferals'], // Row2 with 2 buttons
            ['🎪Marketplace', '📈Stastistics'],
            ['⚙️Settings','🎁Bonus'],
            ['💬Chat']// Row3 with 3 but// // Row3 with 3 buttons Row3 with 3 buttons
        ])

        .resize()
        .extra())




})

//bonus
bot.hears('🎁Bonus',ctx => {
var id=ctx.from.id
var bonus= rn(options)
var dat=new Date().getDate()
    var sql = "SELECT bonus from `account` where `id` = '" + id + "'";
    con.query(sql, function(error, results, fields) {
        if (results[0].bonus==dat) {
            ctx.reply('🚫 You already collected your daily bonus.\nNext bonus will be available in 24hours')
        }else {
            var sqli = "update `account` set `balance` =`balance`+ '" + bonus + "', bonus = " + dat + " where `id` = '" + id + "'";
con.query(sqli)
            ctx.replyWithHTML('Your account has been credited with:\n\n<b>Daily bonus: +</b>'+bonus+'💰\n\n<i>next bonus will be available after 24hrs</i>')
        }
    })


})

//balance
bot.hears('💵Balance',ctx => {
    var id = ctx.from.id
    var sql = "SELECT balance,payout,eggs,time,firstname from `account` where `id` = '" + id + "'";
    con.query(sql, function (error, results, fields) {
        var btc = sb.toBitcoin(results[0].payout);
        var btcAmount, currency, rates;

        rates = require('bitcoin-exchange-rates');

        btcAmount = btc.toFixed(8);

        currency = 'USD';
        rates.fromBTC(btcAmount, currency, function (err, rate) {
            ctx.replyWithHTML('<b>user: </b>' + results[0].firstname + '\n<b>Purchase balance: </b>' + results[0].balance + ' 💰\n<b>Withdraw balance: </b>' + results[0].payout + ' 💰(' + btcAmount + ' BTC)' + '<i>\n📊 ' + btcAmount + ' BTC =$ ' + rate + '</i>\n\n<b>Eggs in store:</b> ' + results[0].eggs + '🥚\n\n<b>Account creation:</b> ' + results[0].time, Extra
                .HTML()
                .markup((m) => m.inlineKeyboard([
                    m.callbackButton('💳Add BTC', '💳Add BTC'),
                    m.callbackButton('🔰Withdraw', '🔰Withdraw')
                ], {columns: 1})))

        })
    })

//transactions
    var user = ctx.from.id
    var sql = "SELECT depoaddre,txid,ref,id from `account` where `id` = '" + user + "'";
    con.query(sql, function (error, res, fields) {
        if (res[0].depoaddre.length > 1) {
            client.getAccount(btc, function (err, account) {
                account.getAddress(res[0].depoaddre, function (err, address) {
                    address.getTransactions({}, function (err, txs) {
                        if (txs.length === 0) {
                            console.log('no transactions today')
                        } else if (txs[0].id == res[0].txid) {
                            console.log('transaction already confirmed')
                        } else if (txs[0].id !== res[0].txid) {
                            var txid = txs[0].id
                            var balance = Math.round(txs[0].amount.amount * 1000000)
                            var transactions = txs[0].amount.amount
                            var chatid = ctx.from.id
                            var sqli = "update `account` SET `txid` = '" + txid + "', balance = `balance`+" + balance + ", transactions = `transactions`+" + transactions + " where `id` = '" + chatid + "'";
                            con.query(sqli, function (err, response) {
                                var ref = res[0].ref
                                var refbonus = Math.round(balance * 0.25)
                                var sqla = "update `account` set `payout` = `payout`+" + refbonus + " where `id` = '" + ref + "'";
                                con.query(sqla)
                                ctx.telegram.sendMessage(res[0].id, 'we have received your deposit of ' + transactions + ' you gain ' + balance + '💰 added to your balance')
                                ctx.telegram.sendMessage(ref, 'you refferal just deposited. ' + refbonus + '💰 has been added to your payout balance')
                                ctx.telegram.sendMessage('@bithentransactions', 'new deposit of ' + transactions + ' BTC by ' + ctx.from.first_name + '\n\nhttps://live.blockcypher.com/btc/address/' + res[0].depoaddre)
                            })
                        }
                    })
                })
            })
        }
    })
})






//add btc
bot.action('💳Add BTC',ctx=>{
    var user=ctx.from.id
    var sql = "SELECT `depoaddre` from `account` where `id` = '" + user + "'";
    con.query(sql, function(error, results, fields) {
        if (results[0].depoaddre.length <= 0) {
            client.getAccount(btc, function (err, account) {
                account.createAddress(null, function (err, address) {
                    var adress = address.address
                    ctx.replyWithHTML('<b>⚡Top up balance</b>\n\nYou can buy game currency for purchasing hens and (💰) using BitCoin. To top up your balance, simply send<b>any amount</b> of BTC to this address\n\n<code>' + adress + '</code>\n\nThe BTC will be automatically credited to the balance at the rate of\n' + '<b>0.1 BTC = 100,000 💰</b>\n' + '<b>0.01 BTC = 10,000 💰</b>\n' + '<b>0.001 BTC = 1,000 💰</b>\n' + '<b>0.0001 BTC = 100 💰 </b>etc.')
var ide =ctx.from.id
                    var sqli = "update `account` set `depoaddre` = '" + adress + "' where `id` = '" + ide + "'";
                            con.query(sqli, function (err, results) {
                                console.log(err)
                                ctx.replyWithHTML('<code>' + adress + '</code>')
                        })
                });
            });

        } else {
            var user = ctx.from.id
            var sqla = "SELECT `depoaddre` from `account` where `id` = '" + user + "'";
            con.query(sqla, function (error, results, fields) {
                ctx.replyWithHTML('<b>⚡Top up balance</b>\n\nYou can buy game currency for purchasing hens and (💰) using BitCoin. To top up your balance, simply send<b>any amount</b> of BTC to this address\n\n<code>' + results[0].depoaddre + '</code>\n\nThe BTC will be automatically credited to the balance at the rate of\n' + '<b>0.1 BTC = 100,000 💰</b>\n' + '<b>0.01 BTC = 10,000 💰</b>\n' + '<b>0.001 BTC = 1,000 💰</b>\n' + '<b>0.0001 BTC = 100 💰 etc.</b>')
                    .then(() => {
                        ctx.replyWithHTML('<code>' + results[0].depoaddre + '</code>')

                    })
            })
        }
    })


})













//refferals
bot.hears('👨‍👧‍👦Refferals',ctx => {

var id=ctx.from.id
    var sql = "SELECT friends from `account` where `id` = '" + id + "'";
    con.query(sql, function(error, results, fields) {
        var earn=results[0].friends*100
        ctx.replyWithHTML('invite friends and get 100💰 for each friend and 25% of your friends deposit\n\n🔅Refferals: <b>'+results[0].friends+'</b> \n\n 🔅earned: <b>'+earn+'</b>',Extra
            .HTML()
            .markup((m) => m.inlineKeyboard([
                m.callbackButton('👤Refferal link', '👤Refferal link')

            ], { columns: 1 })))

    })


})

bot.action('👤Refferal link',ctx=>{
    ctx.editMessageText('https://t.me/Bithenbot?start='+ctx.from.id,Extra
        .HTML()
        .markup((m) => m.inlineKeyboard([
            m.callbackButton('👥Refferals', '👥Refferals')
        ], { columns: 1 })))


})

bot.action('👥Refferals',ctx=>{
    var id=ctx.from.id
    var sql = "SELECT friends from `account` where `id` = '" + id + "'";
    con.query(sql, function(error, results, fields) {
        var earn = results[0].friends * 100
        ctx.editMessageText('invite friends and get 100💰 for each friend and 25% of your friends deposit\n\n🔅Refferals: <b>' + results[0].friends + '</b> \n\n 🔅earned: <b>' + earn + '</b>',Extra
            .HTML()
            .markup((m) => m.inlineKeyboard([
                m.callbackButton('👤Refferal link', '👤Refferal link')
            ], { columns: 1 })))

    })
})

//hens farm
bot.hears('🥚Farm',ctx => {
    var ide = ctx.from.id
    var sql = "SELECT SUM(chickmine+brownmine+yellowmine+cockymine+whitymine+supermine)  from `account` where `id` = '" + ide + "'";
    con.query(sql, function (error, response, fields) {
        var sm=JSON.parse(JSON.stringify(response[0]).replace('SUM(chickmine+brownmine+yellowmine+cockymine+whitymine+supermine)', 'suma'))
    var ide = ctx.from.id
    var sql = "SELECT chick,brown,yellow,cocky,whity,super,chickmine,brownmine,yellowmine,cockymine,whitymine,supermine from `account` where `id` = '" + ide + "'";
    con.query(sql, function (error, results, fields) {

        ctx.replyWithHTML('<b>🥚Farm</b>\n\n<i>The hens you have purchased reside here.They produce 🥚 on the farm,which you need to collect and sell in the marketplace.\nBelow you can see the eggs that your hens have produced and collect them for sale</i>' + '\n\n🐔<b>chick</b>\n🔸Number: ' + results[0].chick + '\n🔸Produced: ' + results[0].chickmine + '🥚' + '\n\n🐔<b>brown</b>\n🔸Number: ' + results[0].brown + '\n🔸Produced: ' + results[0].brownmine + '🥚' + '\n\n🐔<b>yellow</b>\n🔸Number: ' + results[0].yellow + '\n🔸Produced: ' + results[0].yellowmine + '🥚' + '\n\n🐔<b>cocky</b>\n🔸Number: ' + results[0].cocky + '\n🔸Produced: ' + results[0].cockymine + '🥚' + '\n\n🐔<b>whity</b>\n🔸Number: ' + results[0].whity + '\n🔸Produced: ' + results[0].whitymine + '🥚' + '\n\n🐔<b>super</b>\n🔸Number: ' + results[0].super + '\n🔸Produced: ' + results[0].supermine + '🥚' + '\n\n<b>Total:</b> '+sm.suma+' 🥚',Extra
            .HTML()
            .markup((m) => m.inlineKeyboard([
                m.callbackButton('🥚Collect eggs', '🥚Collect eggs')
            ], { columns: 1 }))).then(()=> {
            ctx.reply('click 🏠Menu to go back to main menu', Markup
                .keyboard([
                    ['🏠Menu'], // Row1 with 2 buttons
                ])

                .resize()
                .extra())

        })
    })
    })
})
//myhens

bot.action('My Hens🐔',ctx => {
    var ide = ctx.from.id
    var sql = "SELECT SUM(chickmine+brownmine+yellowmine+cockymine+whitymine+supermine)  from `account` where `id` = '" + ide + "'";
    con.query(sql, function (error, response, fields) {
        var sm=JSON.parse(JSON.stringify(response[0]).replace('SUM(chickmine+brownmine+yellowmine+cockymine+whitymine+supermine)', 'suma'))
        var ide = ctx.from.id
        var sql = "SELECT chick,brown,yellow,cocky,whity,super,chickmine,brownmine,yellowmine,cockymine,whitymine,supermine from `account` where `id` = '" + ide + "'";
        con.query(sql, function (error, results, fields) {

            ctx.replyWithHTML('<b>🥚Farm</b>\n\n<i>The hens you have purchased reside here.They produce 🥚 on the farm,which you need to collect and sell in the marketplace.\nBelow you can see the eggs that your hens have produced and collect them for sale</i>' + '\n\n🐔<b>chick</b>\n🔸Number: ' + results[0].chick + '\n🔸Produced: ' + results[0].chickmine + '🥚' + '\n\n🐔<b>brown</b>\n🔸Number: ' + results[0].brown + '\n🔸Produced: ' + results[0].brownmine + '🥚' + '\n\n🐔<b>yellow</b>\n🔸Number: ' + results[0].yellow + '\n🔸Produced: ' + results[0].yellowmine + '🥚' + '\n\n🐔<b>cocky</b>\n🔸Number: ' + results[0].cocky + '\n🔸Produced: ' + results[0].cockymine + '🥚' + '\n\n🐔<b>whity</b>\n🔸Number: ' + results[0].whity + '\n🔸Produced: ' + results[0].whitymine + '🥚' + '\n\n🐔<b>super</b>\n🔸Number: ' + results[0].super + '\n🔸Produced: ' + results[0].supermine + '🥚' + '\n\n<b>Total:</b> '+sm.suma+' 🥚',Extra
                .HTML()
                .markup((m) => m.inlineKeyboard([
                    m.callbackButton('🥚Collect eggs', '🥚Collect eggs')
                ], { columns: 1 }))).then(()=> {
                ctx.reply('click 🏠Menu to go back to main menu', Markup
                    .keyboard([
                        ['🏠Menu'], // Row1 with 2 buttons
                    ])

                    .resize()
                    .extra())

            })
        })
    })
})






//market
bot.hears('🎪Marketplace',ctx => {
    var id = ctx.from.id
    var sql = "SELECT eggs from `account` where `id` = '" + id + "'";
    con.query(sql, function (error, results, fields) {
        ctx.replyWithHTML('<b>🎪Marketplace</b>\n\n' + 'Here you can sell eggs produced by your hens and earn 💰 which you can use to buy new hens or withdraw to your BTC wallet\n\nexchange rate\n<b>100🥚=1💰</b> ' + '\n\nEggs in storehouse: ' + results[0].eggs + '🥚' + '\n\n<i>After conversion,70% of obtained 💰 will be added to purchase balance and the remaining 30% to withdraw balance.\n The minimum required for conversion is 300🥚</i>', Extra
            .HTML()
            .markup((m) => m.inlineKeyboard([
                m.callbackButton('sell🥚 and get 💰', 'sell🥚 and get 💰')
            ], {columns: 1}))).then(() => {
            ctx.reply('click 🏠Menu to go back to main menu', Markup
                .keyboard([
                    ['🏠Menu'], // Row1 with 2 buttons
                ])

                .resize()
                .extra())

        })
    })
})

//collect eggs
bot.action('🥚Collect eggs',ctx=>{
    var ide = ctx.from.id
    var sql = "SELECT SUM(chickmine+brownmine+yellowmine+cockymine+whitymine+supermine)  from `account` where `id` = '" + ide + "'";
   con.query(sql, function (error, response, fields) {

       var sm = JSON.parse(JSON.stringify(response[0]).replace('SUM(chickmine+brownmine+yellowmine+cockymine+whitymine+supermine)', 'suma'))
       var eggs = sm.suma
       con.query("update `account` set `eggs` = `eggs`+'" + eggs + "' where `id` = '" + ide + "'",
           function (err, results) {
           var b=0;
               var sqli = "update `account` set `chickmine` = '" + b + "', brownmine = " + b + ", yellowmine = " + b + ", cockymine = " + b + ", whitymine = " + b + ", supermine = " + b + " where `id` = '" + ide + "'";
               con.query(sqli,function(err,response) {
                   ctx.reply('you collected: '+eggs+' 🥚')
               })
           })
           })
   })
//marketplace sell
bot.action('sell🥚 and get 💰',ctx=>{
    var id = ctx.from.id
    var sql = "SELECT eggs from `account` where `id` = '" + id + "'";
    con.query(sql,function (err,result) {
        if (result[0].eggs>=300) {
        var id = ctx.from.id
        var balanc =result[0].eggs  * 0.7
        var payou = result[0].eggs - balanc
        var balancee=balanc/100
        var payoute=payou/100
        var payout=Math.round(payoute)
        var balance=Math.round(balancee)

        var eggs = 0;
        var sqli = "update `account` set `balance` = `balance`+'" + balance+"', payout = `payout`+" +
            payout + ", eggs = " + eggs + " where `id` = '" + id + "'";
        con.query(sqli, function (err, response) {
            console.log(err)
            ctx.replyWithHTML('<b>💫Success</b>\n\nyou have sold: <b>' + result[0].eggs + '</b>🥚\n\nReceived:\n <b>' + balance + '</b>💰 towards purchase balance\n<b>' + payout + '</b>💰 towards payout balance')
        })


    }else {
        ctx.replyWithHTML('<b>The minimum required for conversion is 300🥚 and you have '+result[0].eggs+'</b>')

        }
    })
})
































































//cronjobs
//chick
cron.schedule('*/59 * * * *', () => {
    var production=35;
    var bal=1;
    con.query("update `account` set `chickmine` =`chickmine`+`chick`* '" + production + "' where `chick` >= '" + bal + "'")

})
//brown
cron.schedule('*/59 * * * *', () => {
    var production=400;
    var bal=1;
    con.query("update `account` set `brownmine` =`brownmine`+`brown`* '" + production + "' where `brown` >= '" + bal + "'")

})
//yellow
cron.schedule('*/59 * * * *', () => {
    var production=1980;
    var bal=1;
    con.query("update `account` set `yellowmine` =`yellowmine`+`yellow`* '" + production + "' where `yellow` >= '" + bal + "'")

})

//cocky
cron.schedule('*/59 * * * *', () => {
    var production=9990;
    var bal=1;
    con.query("update `account` set `cockymine` =`cockymine`+`cocky`* '" + production + "' where `cocky` >= '" + bal + "'")

})
//whity
cron.schedule('*/59 * * * *', () => {
    var production=25025;
    var bal=1;
    con.query("update `account` set `whitymine` =`whitymine`+`whity`* '" + production + "' where `whity` >= '" + bal + "'")

})
//super
cron.schedule('*/59 * * * *', () => {
    var production=66000;
    var bal=1;
    con.query("update `account` set `supermine` =`supermine`+`super`* '" + production + "' where `super` >= '" + bal + "'")

})
//online
cron.schedule('*/1 * * * * *', () => {
    var id=411002680;
    var idle=1;
    con.query("update `account` set `idle` = '" + idle + "' where `id` = '" + id + "'")

})
//days on
cron.schedule('0 0 0 * * *', () => {
    con.query('update account set `started`=`started`+1 WHERE `id`=411002680')

})



//stastistics
bot.hears('📈Stastistics',ctx => {
    con.query('SELECT `id` FROM `account`', function (error, result) {
        con.query('SELECT SUM(transactions)FROM account;', function (err, response) {
            const re = JSON.parse(JSON.stringify(response[0]).replace('SUM(transactions)', 'suma'))
            con.query('SELECT `started` FROM `account` WHERE `id`=411002680', function (err, respa) {
                ctx.replyWithHTML('<b>📈Stastistics</b>\n\n📈Days online: ' + respa[0].started + '\n👨🏻‍️Members: ' + result.length + '\n💰Total transacted: ' + re.suma + ' BTC' + '\n\nLive payment channel:@bithentransactions')
            })
        })
    })
})
//settings
bot.hears('⚙️Settings',ctx => {
    var user=ctx.from.id
    var sql = "SELECT `withdrawadd` from `account` where `id` = '" + user + "'";
    con.query(sql, function(error, results, fields) {
        ctx.replyWithHTML('<b>settings</b>\n\nHere you can change your withdraw address\n\ncurren withdraw address: <b>' + results[0].withdrawadd + '</b>\n\n<i>Withdraw address need to be set when requesting payouts</i>', Markup
            .keyboard([
                ['🔑set withdraw address'],
                ['🏠Menu'] // Row1 with 2 buttons
            ])

            .resize()
            .extra())
    })

})
//set address
const greeterScene = new Scene('greeter')
greeterScene.enter((ctx) => ctx.reply('send your BTC wallet address to be used for withdrwals below to update it'))
greeterScene.leave((ctx) => ctx.reply('Bye'))
greeterScene.on('message', (ctx) => {
    var valid = WAValidator.validate(ctx.message.text, 'BTC');
    if (valid) {
        var ide = ctx.from.id
        var sqli = "update `account` set `withdrawadd` = '" + ctx.message.text + "' where `id` = '" + ide + "'";
        con.query(sqli)
        ctx.replyWithHTML('<b>withdraw address updated</b>', Markup
            .keyboard([
                ['🐔Hens', '🥚Farm'], // Row1 with 2 buttons
                ['💵Balance', '👨‍👧‍👦Refferals'], // Row2 with 2 buttons
                ['🎪Marketplace', '📈Stastistics'],
                ['⚙️Settings', '🎁Bonus'],
                ['💬Chat']// Row3 with 3 but// // Row3 with 3 buttons Row3 with 3 buttons
            ])

            .resize()
            .extra())


    } else {
        ctx.reply('invalid BTC address', Markup
            .keyboard([
                ['🐔Hens', '🥚Farm'], // Row1 with 2 buttons
                ['💵Balance', '👨‍👧‍👦Refferals'], // Row2 with 2 buttons
                ['🎪Marketplace', '📈Stastistics'],
                ['⚙️Settings', '🎁Bonus'],
                ['💬Chat']// Row3 with 3 but// // Row3 with 3 buttons Row3 with 3 buttons
            ])

            .resize()
            .extra())


    }
})
//withdraw
const withdrawscene = new Scene('withdraw')
withdrawscene.enter((ctx) =>{
    var id = ctx.from.id
    var sql = "SELECT payout,withdrawadd,transactions from `account` where `id` = '" + id + "'";
    con.query(sql, function (error, results, fields) {
if (results[0].withdrawadd=="none"){
    ctx.replyWithHTML('<b>withdraw address not set</b>\n\n<i>you can set your withdraw address in ⚙️Settings</i>')
}else if (results[0].payout<2000){
    ctx.replyWithHTML('<b>your payout balance is less than the minimum required for withdrawal.</b>\n\n<i>The minimum required for withdrawal is 2000💰 and you have</i> <b>'+results[0].payout+'</b>💰')
}else if (results[0].transactions<=0){
    ctx.reply('you need atleast one deposit to request for a withdraw')
} else {
    ctx.replyWithHTML('<b>🏵Withdraw funds</b>\n\nyour withdraw wallet: <b>'+results[0].withdrawadd+'</b>\n\nThe withdrawal of funds is made from the balance designated for payments at the rate of 0.001 BTC = 1,000 💰\n<b>Your balance '+results[0].payout+'💰</b>')
        .then(()=>{
            ctx.replyWithHTML('<i>Enter the number of 💰 you would like to withdraw to your BitCoin Wallet (a minimum of 2000)</i>',Markup
                .keyboard([
                    ['🏠Menu'], // Row1 with 2 buttons
                ])

                .resize()
                .extra())

        })



}
    })

})
withdrawscene.on('message',ctx=>{
    if (isNaN(ctx.message.text)){
        ctx.reply('That is not a valid amount',Markup
            .keyboard([
                ['🐔Hens','🥚Farm'], // Row1 with 2 buttons
                ['💵Balance', '👨‍👧‍👦Refferals'], // Row2 with 2 buttons
                ['🎪Marketplace', '📈Stastistics'],
                ['⚙️Settings','🎁Bonus'],
                ['💬Chat']// Row3 with 3 buttons Row3 with 3 buttons
            ])

            .resize()
            .extra())
    }else if (ctx.message.text<2000){
        ctx.replyWithHTML('<i>This amount is less than the minimum required</i>',Markup
            .keyboard([
                ['🐔Hens','🥚Farm'], // Row1 with 2 buttons
                ['💵Balance', '👨‍👧‍👦Refferals'], // Row2 with 2 buttons
                ['🎪Marketplace', '📈Stastistics'],
                ['⚙️Settings','🎁Bonus'],
                ['💬Chat']// Row3 with 3 buttons Row3 with 3 buttons
            ])

            .resize()
            .extra())


    } else {
        var id = ctx.from.id
        var sql = "SELECT payout,withdrawadd from `account` where `id` = '" + id + "'";
        con.query(sql, function (error, results, fields) {
            var payout=ctx.message.text/1000000
            var addre=results[0].withdrawadd
            client.getAccount(btc, function(err, account) {
                account.sendMoney({'to':addre,
                    'amount':payout,
                    'currency': 'BTC'}, function(err, tx) {
                    ctx.telegram.sendMessage('@bithentransactions','New withdrawal of '+payout+' BTC by '+ctx.from.first_name+'\n\nhttps://live.blockcypher.com/btc/address/'+results[0].withdrawadd)
var user=ctx.from.id
                    var amount=ctx.message.text
                    var sqla = "update `account` set `payout` = `payout`-" + amount + " where `id` = '" + user + "'";
                    con.query(sqla)

                    ctx.replyWithHTML('Your withdrawal of '+payout+' BTC is being processed',Markup
                        .keyboard([
                            ['🐔Hens','🥚Farm'], // Row1 with 2 buttons
                            ['💵Balance', '👨‍👧‍👦Refferals'], // Row2 with 2 buttons
                            ['🎪Marketplace', '📈Stastistics'],
                            ['⚙️Settings','🎁Bonus'],
                            ['💬Chat']// Row3 with 3 buttons Row3 with 3 buttons
                        ])

                        .resize()
                        .extra())
                });
            });



        })


    }




})
//admin
const adminscene = new Scene('admin')
adminscene.enter((ctx) =>{
  ctx.reply('sms all')
})
adminscene.on('message',ctx => {
    con.query('SELECT `id` from `account`',function (err,results) {
        results.forEach(function (res) {
            if (ctx.from.id==411002680) {
                var id = res.id
                ctx.telegram.sendMessage(id, ctx.message.text)
            }else {
                ctx.reply('you are not an admin')
            }
        })
    })
        })








//chat
bot.hears('💬Chat',ctx => {
    ctx.replyWithHTML('<b>Help group:</b> @bithenchat\n\n<b>payouts channel: </b> @bithentransactions')

})




const stage = new Stage([greeterScene,withdrawscene,adminscene], { ttl: 1800 })
bot.use(session())
bot.use(stage.middleware())
bot.hears('🔑set withdraw address', enter('greeter'))
bot.action('🔰Withdraw',enter('withdraw'))
bot.hears('Admin',enter('admin'))









bot.startPolling()
