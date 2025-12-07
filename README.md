# KeyVault - Chrome Password Manager

**KeyVault**, şifrelerinizi güvenli ve kolay bir şekilde yönetmenizi sağlayan modern bir Google Chrome eklentisidir. Firebase veya bulut sunucularına ihtiyaç duymadan, verilerinizi **%100 yerel ve şifreli** olarak tarayıcınızda (Local Storage) saklar.

![Icon](icon.png)

## Ozellikler

*   **Hizli Erisim**: Şifrelerinize tarayıcı çubuğundan anında erişin.
*   **Tamamen Yerel**: Verileriniz bilgisayarınızdan dışarı çıkmaz. İnternet gerektirmez.
*   **Otomatik Doldurma (Autofill)**: Tek tıkla giriş formlarını (Kullanıcı adı & Şifre) doldurur.
*   **Arama**: Kayıtlı yüzlerce şifre arasından anında arama yapın.
*   **Kolay Kopyalama**: Şifre veya kullanıcı adını tek tıkla panoya kopyalayın.
*   **Modern Arayuz**: Göz yormayan, şık ve hızlı kullanıcı arayüzü.
*   **Manifest V3**: Chrome'un en yeni ve güvenli eklenti mimarisi ile geliştirildi.

## Kurulum (Gelistirici Modu)

Bu proje henüz Chrome Web Mağazası'nda yayınlanmadıysa, "Geliştirici Modu" ile yükleyebilirsiniz:

1.  Bu projeyi bilgisayarınıza indirin (ZIP'ten çıkarın veya `git clone` yapın).
2.  Google Chrome'da **`chrome://extensions`** adresine gidin.
3.  Sağ üst köşedeki **"Geliştirici Modu"** (Developer Mode) anahtarını açın.
4.  Sol üstte beliren **"Paketlenmiş oge yukle"** (Load Unpacked) butonuna tıklayın.
5.  İndirdiğiniz **`KeyVault`** klasörünü seçin.
6.  Tebrikler! KeyVault tarayıcınıza eklendi.

## Kullanim

1.  **Sifre Ekleme**: Eklenti ikonuna tıklayın, "Yeni Ekle" sekmesine geçin ve site bilgilerini girip "Kaydet"e basın.
2.  **Otomatik Doldurma**: Kaydettiğiniz bir siteye (örn: `google.com`) gidin. Eklentiyi açın ve ilgili kaydın yanındaki **"Otomatik Doldur"** butonuna basın.
3.  **Yonetim**: "Kayıtlı Şifreler" sekmesinden şifreleri arayabilir, silebilir veya kopyalayabilirsiniz.

## Proje Yapisi

*   `manifest.json`: Eklenti yapılandırması (Manifest V3).
*   `popup.html` & `popup.js`: Kullanıcı arayüzü ve mantığı.
*   `content_script.js`: Sayfa içi otomatik doldurma işlemleri.
*   `icon.png`: Uygulama ikonu.

## Katkida Bulunma

1.  Bu depoyu (repo) fork edin.
2.  Yeni bir özellik dalı (branch) oluşturun (`git checkout -b ozellik/YeniOzellik`).
3.  Değişikliklerinizi commit edin (`git commit -m 'Yeni özellik eklendi'`).
4.  Dalınızı (branch) gönderin (`git push origin ozellik/YeniOzellik`).
5.  Bir Pull Request (PR) oluşturun.

## Lisans

Bu proje [MIT](LICENSE) lisansı ile lisanslanmıştır.
