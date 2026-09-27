# Neon Vortex

Dairesel bir arenada hayatta kal. Neon ışıklar, yoğun düşman dalgaları, geri tepmeyle hareket.

Ateş ettiğinde gemi itilir. Hareketin silahındır.

## Hızlı başlangıç

```bash
pnpm install
pnpm dev
```

## Kontroller

| Tuş | İş |
| --- | --- |
| Mouse | Geminin yönü |
| Sol tık | Ateş eder; geri tepme gemiyi iter |
| WASD | Alternatif hareket (ayarlardan açılır) |
| Space | WASD modunda ateş |
| Esc | Duraklat / devam |

## Nasıl oynanır

1. Sol tıkla ateş et. Geri tepme gemiyi iter; arenada böyle hareket edersin.
2. Renkli düşmanlara değme.
3. Neon duvarlar ayara göre öldürebilir.
4. Her öldürülen düşman puan getirir.

## Düşmanlar

| Tür | Davranış |
| --- | --- |
| Normal | Yavaşça yaklaşır |
| Dasher | Hızlı hareket eder |
| Shooter | Sana mermi atar |
| Tank | Daha çok hasar alır, daha çok puan verir |

## Güçlendirmeler

Düşman öldürünce şansa bağlı düşer. Mermilerle de toplanır.

| Güç | Etki |
| --- | --- |
| Rapid Fire | Daha hızlı ateş |
| Spread Shot | Üçlü yayılım |
| Shield | Bir ölümden kurtarır |

## Modlar

| Mod | Kural |
| --- | --- |
| Normal | Ölünce oyun biter |
| Infinite | Ölünce de devam |
| Survival | Dakikada belirli sayıdan fazla ölürsen biter |

## İpuçları

- Kaçarken ateş et; geri tepme kaçış yolundur.
- Power-up'ları mermilerle de topla.
- Level arttıkça düşmanlar çeşitlenir ve sıklaşır.
- Duvar modunu Bounce yaparsan arena daha affedici olur.

## Geliştirme

```bash
pnpm lint
pnpm typecheck
pnpm test
pnpm build
```

Ortam için `.env.example` dosyasını kopyala.

| Değişken | Ne yapar |
| --- | --- |
| `VITE_ANALYTICS_ENABLED` | Analytics aç/kapat |
| `VITE_GA_MEASUREMENT_ID` | GA measurement id |
| `VITE_ENABLE_CHEATS` | Production build'de cheat menüsü |

Kritik akışlar ve metrik hedefleri: [`docs/baseline-metrics.md`](docs/baseline-metrics.md)

**Yığın:** React 19, TypeScript, Vite, Vitest.

## Lisans

[MIT](LICENSE) © 2026 Cem Çakırlar
