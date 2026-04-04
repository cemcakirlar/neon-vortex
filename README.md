# 🌀 Neon Vortex

Dairesel bir arenada hayatta kalmaya çalıştığın, neon ışıklarla bezeli yoğun bir arcade survival oyunu. Ateş ettiğinde geri tepme kuvvetiyle hareket edersin — stratejin bu!

## 🎮 Oyun Kılavuzu

### Kontroller

| Kontrol     | Açıklama                                    |
| ----------- | ------------------------------------------- |
| **Mouse**   | Geminin yönünü kontrol eder                 |
| **Sol Tık** | Ateş eder (geri tepme ile hareket!)         |
| **WASD**    | Alternatif hareket modu (ayarlardan açılır) |
| **Space**   | WASD modunda ateş etme                      |
| **ESC**     | Oyunu duraklat/devam et                     |

### Nasıl Oynanır?

1. **Ateş Et, Hareket Et**: Sol tık ile ateş ettiğinde gemi geri tepme kuvvetiyle itilir. Bu sayede arenada hareket edersin.
2. **Düşmanlardan Kaç**: Renkli düşmanlar sana doğru gelir. Onlara değme!
3. **Duvarlara Dikkat**: Neon duvarlar öldürücü olabilir (ayara göre değişir).
4. **Öldür, Puan Kazan**: Her düşman öldürdüğünde puan kazanırsın.

### Düşman Türleri

| Tür         | Özellik                                  |
| ----------- | ---------------------------------------- |
| **Normal**  | Sana doğru yavaşça yaklaşır              |
| **Dasher**  | Hızlı hareket eder                       |
| **Shooter** | Sana doğru mermi atar                    |
| **Tank**    | Daha fazla hasar alır, yüksek puan verir |

### Güçlendirmeler (Power-Ups)

Düşmanları öldürdüğünde şansa bağlı olarak güçlendirmeler düşer:

- 🔥 **Rapid Fire**: Daha hızlı ateş etme
- 🌟 **Spread Shot**: 3'lü yayılım atışı
- 🛡️ **Shield**: Bir ölümden kurtulursun

### Oyun Modları

- **Normal**: Klasik mod, öldüğünde oyun biter
- **Infinite**: Sonsuz mod, ölsen bile devam edersin
- **Survival**: Dakikada belirli sayıdan fazla ölürsen oyun biter

### İpuçları

- Geri tepmeyi avantajına kullan — düşmanlardan kaçarken ateş et
- Power-up'ları mermilerle de toplayabilirsin
- Level arttıkça düşmanlar daha çeşitli ve sık gelir
- Duvar modunu "Bounce" yaparak daha rahat oynayabilirsin

---

## 🛠️ Geliştirme

```bash
pnpm install
pnpm dev
```

**Teknolojiler**: React 19 + TypeScript + Vite
