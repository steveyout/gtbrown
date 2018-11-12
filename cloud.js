const Telegraf = require('telegraf');
const Extra = require('telegraf/extra');
const Markup = require('telegraf/markup');
const bot = new Telegraf("643988085:AAEHKlBaXqvlVc-AY_RnIuUavdbU8vNw1wA");
const Scene = require('telegraf/scenes/base')
const session = require('telegraf/session')
const Stage = require('telegraf/stage')
const { enter,leave } = Stage
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
    if (message.text == start) {
        var chatid = ctx.from.id;
        var firstname = ctx.from.first_name;
        var bal = 0;
        var tim = new Date();
        var address = 'none';
        var refa=411002680;
        var user = {id: chatid, balance: bal, firstname: firstname, time: tim, withdrawadd: address,ref:refa};
        con.query("insert into `account` SET ?", user, function (error, results) {
            ctx.reply('welcome ' + ctx.from.first_name + ' to Bithen.\nhere you can:\n 🔸breed hens 🐔 \n🔸collect eggs 🥚 and \n🔸earn real money 💵 in BTC', Markup
                .keyboard([
                    ['🐔Hens','🥚Farm'], // Row1 with 2 buttons
                    ['💵Balance', '👨‍👧‍👦Refferals'], // Row2 with 2 buttons
                    ['🎪Marketplace', '📈Stastistics'],
                    ['⚙️Settings','🎁Bonus']// Row3 with 3 buttons Row3 with 3 buttons
                ])

                .resize()
                .extra())
        })
    } else if (message.text.split(start)[1] == id) {
        ctx.reply('🚫You cannot refer yourself', Markup
            .keyboard([
                ['🐔Hens','🥚Farm'], // Row1 with 2 buttons
                ['💵Balance', '👨‍👧‍👦Refferals'], // Row2 with 2 buttons
                ['🎪Marketplace', '📈Stastistics'],
                ['⚙️Settings','🎁Bonus']// // Row3 with 3 buttons Row3 with 3 buttons
            ])

            .resize()
            .extra())
    } else if (message.text.split(start)[1] !== id) {

        var chatd = ctx.from.id
        con.query("SELECT id FROM account WHERE id=" + chatd, function (err, result, fields) {
            console.log(result.length)
            if (result.length==0) {

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
                        var refbonus =100;
                        var ref = 1;
                        var refid = message.text.split(start)[1];

                        var sql = "update `account` set `balance` =`balance`+" + refbonus + ", `friends`=`friends`+ '" + ref + "' where `id` = '" + refid + "'";

                        con.query(sql)

                        ctx.reply('welcome ' + ctx.from.first_name + ' to Bithen.\nhere you can:\n 🔸breed hens 🐔 \n🔸collect eggs 🥚 and \n🔸earn real money 💵 in BTC', Markup
                            .keyboard([
                                ['🐔Hens','🥚Farm'], // Row1 with 2 buttons
                                ['💵Balance', '👨‍👧‍👦Refferals'], // Row2 with 2 buttons
                                ['🎪Marketplace', '📈Stastistics'],
                                ['⚙️Settings','🎁Bonus']// Row3 with 3 buttons Row3 with 3 buttons
                            ])

                            .resize()
                            .extra())
                        con.query("SELECT id FROM account WHERE id=" + refid, function (err, result, fields) {
                            ctx.telegram.sendMessage(result[0].id, 'you have a new refferal\nyou receive:+100 💰')


                        })
                    }
                })

            }else if (result.length>0) {
                var rd=ctx.from.id
                con.query("SELECT ref FROM account WHERE id=" + rd, function (err, result, fields) {
                    if (result[0].ref == ctx.message.text.split(start)[1]) {
                        ctx.reply('🚫you have already used this link', Markup
                            .keyboard([
                                ['🐔Hens','🥚Farm'], // Row1 with 2 buttons
                                ['💵Balance', '👨‍👧‍👦Refferals'], // Row2 with 2 buttons
                                ['🎪Marketplace', '📈Stastistics'],
                                ['⚙️Settings','🎁Bonus']/// Row3 with 3 buttons Row3 with 3 buttons
                            ])

                            .resize()
                            .extra())
                    }
                })
            }
        })
    }
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
//mainmenu
bot.hears('🏠Menu',ctx => {
    ctx.reply('Main menu', Markup
        .keyboard([
            ['🐔Hens','🥚Farm'], // Row1 with 2 buttons
            ['💵Balance', '👨‍👧‍👦Refferals'], // Row2 with 2 buttons
            ['🎪Marketplace', '📈Stastistics'],
            ['⚙️Settings','🎁Bonus']// // Row3 with 3 buttons Row3 with 3 buttons
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
            ctx.replyWithHTML('<b>user: </b>' + results[0].firstname + '\n<b>Purchase balance: </b>' + results[0].balance + ' 💰\n<b>Withdraw balance: </b>' + results[0].payout + ' 💰(' + btcAmount + ' BTC)' + '<i>\n📊 ' + btcAmount + ' BTC =$ ' + rate + '</i>\n\n<b>Eggs in store:</b> ' + results[0].eggs + '🥚\n\n<b>Account creation:</b> ' + results[0].time,Extra
                .HTML()
                .markup((m) => m.inlineKeyboard([
                    m.callbackButton('💳Add BTC', '💳Add BTC'),
                    m.callbackButton('🔰Withdraw', '🔰Withdraw')
                ], { columns: 1 })))

        })
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








bot.startPolling()