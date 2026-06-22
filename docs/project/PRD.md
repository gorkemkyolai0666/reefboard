# ReefBoard — Product Requirements Document

## Vizyon

Türkiye'deki dalış merkezleri, PADI/SSI eğitmenleri ve dalış okulları için dijital operasyon yönetim platformu. Öğrenci kayıtları, kurs planlaması, dalış günlüğü takibi ve ekipman envanter yönetimini tek çatı altında toplar.

## Hedef Kitle

- Dalış merkezleri (küçük ve orta ölçekli)
- PADI/SSI sertifikalı dalış eğitmenleri
- Dalış okulları ve kursiyerleri
- Ekipman kiralama operatörleri

## Sektör

Macera Turizmi / Su Altı Sporları

## Problem

1. Öğrenci sertifika seviyeleri ve sağlık belgeleri kağıt üzerinde takip ediliyor
2. Kurs planlaması ve katılımcı yönetimi manuel yapılıyor
3. Dalış günlükleri kişisel defterlerde tutuluyor — merkezi veri yok
4. Ekipman bakım takibi yapılamıyor — güvenlik riski oluşuyor
5. Gelir ve operasyon istatistikleri anlık görülemiyor

## Tasarım Yönelimi

**Futuristic Ocean Glassmorphism** — derin okyanus mavisi, mercan aksanı, biyolüminesan deniz yeşili:
- Birincil: Derin Okyanus (#0B1D3A)
- Mercan Aksan: (#FF6B6B)
- Resif Yeşili: (#00D4AA)
- Kum Nötr: (#C09B56)
- Zemin: Açık Mavi-Gri (#F0F4F8)
- Font: Playfair Display (başlık) + Inter (gövde)
- Glassmorphic kartlar, blur efektleri, ocean gradient sidebar

## İş Modeli

B2B SaaS — aktif öğrenci sayısına göre aylık abonelik

## Temel Özellikler

1. Kimlik doğrulama (kayıt/giriş/JWT)
2. Öğrenci sicili (sertifika seviyesi, sağlık onayı, dalış geçmişi)
3. Kurs yönetimi (PADI/SSI kursları, eğitmen atama, katılımcı takibi)
4. Dalış günlüğü (derinlik, süre, sıcaklık, görüş, buddy)
5. Ekipman envanteri (bakım durumu, kiralama, seri numarası)
6. Dashboard istatistikleri (aktif öğrenci, kurs, gelir, bakım uyarıları)
7. Merkez profil yönetimi

## Teknik Mimari

- Backend: NestJS + Prisma + PostgreSQL
- Frontend: Next.js 14 + Tailwind CSS
- Dağıtım: Railway (backend) + Vercel (frontend)
