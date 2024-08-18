Tolnagro - test assignment

Létre kell hozni egy publikus felületet, ahol: 
	- egy táblázatban kilistázza a rendszer a különböző emaileket, amiket kiküldött,
	- megjeleníti, hogy hányszor lettek azok kiküldve

A listában a megjelenített adatok mellett legyen 1 gomb:
	- aminek megnyomására a rendszer kitörli az adott emailt egy megerősítést követően. 
	- a megerősítés a SweetAlert2 csomaggal történjen.

A lista fölött helyezkedjen el egy gomb, 
	- mely kattintásra új oldalon vagy egy modal ablakon keresztül megjelenik egy űrlap,
	- az űrlap segítségével létre lehet hozni egy új e-mailt.


Egy PHP Artisan parancs percenkénti futtatásával:
	- ki kell küldeni három tetszőleges címre az összes e-mail értesítést.


Elinditashoz az alábbi parancsokat kell futtatni:
php artisan serve
npm run dev


E-mail küldő parancs:
php artisan app:send-random
