## 資料庫欄位型態 VARCHAR 跟 TEXT 的差別是什麼

VARCHAR 可以自己設定要存幾個字元，TEXT 預設會留六萬多個字的大小，使用者無法決定檔案大小。
若已知需要多少字元，用 VARCHAR 這型態較省空間。

## Cookie 是什麼？在 HTTP 這一層要怎麼設定 Cookie，瀏覽器又會以什麼形式帶去 Server？

Cookie 是瀏覽器（client 端）存放資訊的一個地方，可以記憶使用者的資訊，最常見的是紀錄登入狀態。
瀏覽器和 server 之間進行資料交換時，會用 HTTP header 來帶 cookie 到 server。瀏覽器讀取 server 返回的 response 時，也會把相關 cookie 存下來。
設定： `Set-Cookie: name=value; expires=date; path=path; domain=domain; secure`

## 我們本週實作的會員系統，你能夠想到什麼潛在的問題嗎？

任何可以讓 clinet 端輸入資訊的地方，都有可能被植入惡意的程式碼來竄改網頁、竊取使用者資訊。
如：

1. XSS（在文字輸入的欄位插入 JavaScript 語法，惡搞你的網頁）。
2. SQL Injection（惡搞 database）。
3. 因為 cookie 紀錄的是簡單的 id（1, 2, 3...）所以可以任意竄改，冒用別人身份登入。
4. 密碼存明碼，有夠危險。