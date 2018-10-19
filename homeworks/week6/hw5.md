## 請說明 SQL Injection 的攻擊原理以及防範方法

* 原理：SQL query 的寫法太簡易，讓 client 端可以直接把惡意程式碼寫入資料庫。例如只要在 username 輸入「’ or 1=1 --’」，不用打密碼就能直接登入。
* 防範：使用 prepare statement，在想放變數的地方加問號，再來定義輸入的值應該是什麼格式，先行驗證 client 端輸入的資訊，不讓 client 端輸入的東西直接結合 SQL query。

## 請說明 XSS 的攻擊原理以及防範方法

* 原理：讓 client 端在文字輸入框中直接輸入 JavaScript 語法，任何人都可以執行 script。
* 防範：escape 跳脫。在 echo 內容時，加入「htmlspecialchars(內容, 要escape哪些東西, ‘編碼’)」這個 PHP 的 function，如此就不會把 client 輸入的東西辨識成 HTML 的語法，而會直接當成純文字。

## 請說明 CSRF 的攻擊原理以及防範方法

* 原理：瀏覽器在發送 request 時，會自動把 cookie 帶上去，server 端驗證後確定使用者無誤就能進行登入後才能做的事。若有另外一個惡意網站讓會員無意間對已登入的網站發出 request，server 會以為是會員自己發出的，使用者也不知道自己做了這件事，如此便可達成攻擊者的特定目的。用 GET 傳遞資訊容易啟動這樣的攻擊，攻擊者也可能提供假的頁面，讓使用者按下 submit 時，發送出 POST request。
* 防範：

#### client 端：
使用者在每次瀏覽完網站就登出。

#### browser 端：
設置 cookie 時在後面加入 `SameSite` 即可（分為預設值 `SameSite=Strict` 和 `SameSite=Lax`），但並非所有瀏覽器都支援這個 attribute。

#### server 端：
1. 用「只有使用者知道的資訊」來驗證。例如圖形驗證碼、簡訊驗證碼、CSRF token 等等。CSRF token 就是在 form 中加上一個隱藏的欄位 `csrftoken`，每次 submit 時，server 會驗證這個欄位和 session 中儲存的是否一樣。但如果 server 接受不同 domain 的 request，攻擊者還是有可能拿到這個欄位並進行攻擊。 
2. Double Submit Cookie，原理和 csrf token 一樣，此方法不需要 server 儲存東西，而是在 client 端設置一組名為 csrftoken 的 cookie，submit 時 server 檢查 cookie 中和 form 中的 csrftoken 是否一樣即可。

## 請舉出三種不同的雜湊函數

* [MD5](https://en.wikipedia.org/wiki/MD5)：1996年後被證實存在弱點，可以被加以破解，對於需要高度安全性的資料，專家一般建議改用其他演算法。
* [SHA-2](https://en.wikipedia.org/wiki/SHA-2)：2001年發布，包括SHA-224、SHA-256、SHA-384、SHA-512、SHA-512/224、SHA-512/256。雖然至今尚未出現對SHA-2有效的攻擊，它的演算法跟SHA-1基本上仍然相似，2017年荷蘭密碼學研究小組CWI和Google正式宣布攻破了SHA-1；因此有些人開始發展其他替代的雜湊演算法。
* [SHA-3](https://en.wikipedia.org/wiki/SHA-3)：2015年正式發布，SHA-3並不是要取代SHA-2，因為SHA-2目前並沒有出現明顯的弱點。由於對MD5出現成功的破解，以及對SHA-0和SHA-1出現理論上破解的方法，NIST感覺需要一個與之前演算法不同的，可替換的加密雜湊演算法，也就是現在的SHA-3。
* [bcrypt](https://en.wikipedia.org/wiki/Bcrypt)：根據 Blowfish 加密演算法所設計的密碼雜湊函式，於1999年在 USENIX 中展示。實作中 bcrypt 會使用一個加鹽的流程以防禦彩虹表攻擊，同時 bcrypt 還是適應性函式，它可以藉由增加疊代之次數來抵禦日益增進的電腦運算能力透過暴力法破解。

## 請去查什麼是 Session，以及 Session 跟 Cookie 的差別

由於 HTTP 是 stateless 無狀態協議，所以 client 端每次發出請求時，無法得知上一次請求相關的數據。因此便需要 session 和 cookie 來保存用戶資訊。

* cookie 在 client 端，是瀏覽器提供的、一個存放用戶資料的地方，可以想像成一個容器。填寫表單時，自動帶入的資料就是瀏覽器存取的 cookie。瀏覽器每次發出請求時，都會帶上相應的 cookie。

* session 像是識別證，負責紀錄在 web server 上的使用者訊息，它通常是存在記憶體中（用 PHP 提供的 session 機制就可以做到），所以主機重開機的話 session 都會消失。session 機制會在一個用戶完成身分認證後，存下所需的用戶資料，接著產生一組對應的 id，存入 cookie 後傳回 client 端，由瀏覽器保存。因為存在 client 端的 cookie 有可能遭竄改，因此 session id 會用亂數的方式生成，保持其獨特性，避免身份冒用，且每過一段時間就會 time out。

## `include`、`require`、`include_once`、`require_once` 的差別

用途是相同的（引入 PHP 文件內容），但在失敗時的表現會有差異：

* `require` 會產生錯誤（E_COMPILE_ERROR），並停止執行 script。
* `include` 只會產生一個警告（E_WARNING），script 會繼續執行。

`include_once`、`require_once` 只會引入該文件一次，若檔案內已包含欲引入的文件內容，則不會重複引入。