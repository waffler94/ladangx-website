import { getLocale } from 'next-intl/server';
import React from 'react'

export default async function page() {
    const locale = await getLocale();
    return (
        locale === "en" ? <EnglishTerms /> : <MalayTerms />
    )
}

const EnglishTerms = () => {
    return (
        <div className="max-w-4xl pb-[12px] mx-auto">
            <h1 className="text-2xl font-bold text-center mb-2">MOTOMARIN SDN BHD</h1>

            <h2 className="text-xl font-bold text-center mb-3">PRIVACY POLICY & PARK RULES</h2>

            <p className="text-center italic text-gray-700 mb-4">
                (Applicable to X Park Malaysia & Ladang X)
            </p>

            <div className="mb-4">
                <p><span className="font-bold">Effective Date:</span> 20/01/2026</p>
                <p><span className="font-bold">Last Updated:</span> 20/01/2026</p>
            </div>

            <p className="mb-6">
                This document applies to the mobile application ("App") operated by <span className="font-bold">Motomarin Sdn Bhd</span>, owner and operator of <span className="font-bold">X Park Malaysia</span> and <span className="font-bold">Ladang X</span>.
            </p>

            <p className="mb-6">
                By using the App, entering the parks, or participating in any games or activities, you agree to the terms below.
            </p>

            <h2 className="text-2xl font-bold text-center mb-4 mt-8">PART A</h2>

            <h3 className="text-xl font-bold text-center mb-6">PRIVACY POLICY (PDPA-COMPLIANT)</h3>

            <p className="mb-6">
                This Privacy Policy is issued in accordance with the <span className="font-bold">Personal Data Protection Act 2010 (Malaysia)</span> ("PDPA").
            </p>

            <h4 className="text-lg font-bold mb-3">1. PERSONAL DATA COLLECTED</h4>

            <p className="mb-3">We may collect the following data through the App or on-site:</p>

            <p className="font-bold mb-2">a) Identity & Contact Data</p>
            <ul className="list-disc pl-6 mb-4 space-y-1">
                <li>Name</li>
                <li>Mobile number</li>
                <li>Email address</li>
                <li>NRIC / Passport (where required for safety, insurance, or bookings)</li>
                <li>Age / Date of birth (especially for children's activities)</li>
            </ul>

            <p className="font-bold mb-2">b) App & Experience Data</p>
            <ul className="list-disc pl-6 mb-4 space-y-1">
                <li>App usage behaviour</li>
                <li>Tour paths, games completed, QR scans</li>
                <li>Points, badges, or rewards earned</li>
                <li>Booking and participation history</li>
            </ul>

            <p className="font-bold mb-2">c) Device & Technical Data</p>
            <ul className="list-disc pl-6 mb-4 space-y-1">
                <li>Device type</li>
                <li>IP address</li>
                <li>Location data (if enabled)</li>
                <li>App analytics and crash reports</li>
            </ul>

            <div className="bg-yellow-100 border-l-4 border-yellow-500 p-4 mb-6">
                <p className="text-sm">
                    ⚠️ Payment card details are <span className="font-bold">not stored</span>. All payments are handled via secure third-party gateways.
                </p>
            </div>

            <h4 className="text-lg font-bold mb-3">2. PURPOSE OF DATA COLLECTION</h4>

            <p className="mb-3">Your personal data is used for:</p>
            <ul className="list-disc pl-6 mb-6 space-y-1">
                <li>App registration and identity verification</li>
                <li>Enhancing park experience (tours, games, learning trails)</li>
                <li>Activity bookings and safety management</li>
                <li>Customer support</li>
                <li>Promotions, events, and announcements (opt-out available)</li>
                <li>Operational analytics and service improvement</li>
                <li>Legal, regulatory, and insurance requirements</li>
            </ul>

            <h4 className="text-lg font-bold mb-3">3. CONSENT</h4>

            <p className="mb-3">By:</p>
            <ul className="list-disc pl-6 mb-4 space-y-1">
                <li>Registering an account</li>
                <li>Using the App</li>
                <li>Booking activities</li>
                <li>Entering the park</li>
            </ul>

            <p className="mb-4">
                You <span className="font-bold">expressly consent</span> to the collection, use, and processing of your personal data as described.
            </p>

            <p className="mb-6">
                Consent may be withdrawn subject to legal and operational limitations.
            </p>

            <h4 className="text-lg font-bold mb-3">4. DISCLOSURE OF DATA</h4>

            <p className="mb-3">Personal data may be disclosed to:</p>
            <ul className="list-disc pl-6 mb-4 space-y-1">
                <li>Motomarin internal teams</li>
                <li>Park operators and safety staff</li>
                <li>IT vendors, analytics providers, and payment gateways</li>
                <li>Insurance providers</li>
                <li>Government or regulatory authorities when required by law</li>
            </ul>

            <p className="mb-6">
                Motomarin <span className="font-bold">does not sell personal data</span>.
            </p>

            <h4 className="text-lg font-bold mb-3">5. DATA TRANSFER & STORAGE</h4>

            <p className="mb-6">
                Data may be stored on secure cloud servers, including servers located outside Malaysia, with <span className="font-bold">reasonable safeguards</span> in line with PDPA standards.
            </p>

            <h4 className="text-lg font-bold mb-3">6. DATA SECURITY & RETENTION</h4>

            <ul className="list-disc pl-6 mb-6 space-y-1">
                <li>Reasonable administrative, technical, and physical safeguards are in place</li>
                <li>Data is retained only as long as necessary</li>
                <li>Data is securely deleted or anonymised when no longer required</li>
            </ul>

            <h4 className="text-lg font-bold mb-3">7. USER RIGHTS (PDPA)</h4>

            <p className="mb-3">You have the right to:</p>
            <ul className="list-disc pl-6 mb-4 space-y-1">
                <li>Access your personal data</li>
                <li>Correct inaccurate or incomplete data</li>
                <li>Withdraw consent for marketing communications</li>
            </ul>

            <p className="mb-6">
                Requests can be made via contact details below.
            </p>

            <h2 className="text-2xl font-bold text-center mb-4 mt-8">PART B</h2>

            <h3 className="text-xl font-bold text-center mb-4">LADANG X -- PARK RULES & CODE OF CONDUCT</h3>

            <p className="text-center italic text-gray-700 mb-6">
                (Theme Park-Style Rules)
            </p>

            <p className="mb-6">
                Ladang X is a <span className="font-bold">family-friendly, educational, farm-based attraction</span>. For safety, enjoyment, and animal welfare, the following rules apply.
            </p>

            <h4 className="text-lg font-bold mb-3">8. GENERAL PARK RULES</h4>

            <p className="mb-3">All visitors must:</p>
            <ul className="list-disc pl-6 mb-4 space-y-1">
                <li>Follow all park signage and staff instructions</li>
                <li>Supervise children at all times</li>
                <li>Remain within designated visitor areas</li>
                <li>Wear appropriate footwear and attire</li>
                <li>Respect other visitors and staff</li>
            </ul>

            <p className="mb-6">
                Motomarin reserves the right to <span className="font-bold">refuse entry or remove any person</span> for unsafe or disruptive behaviour.
            </p>

            <h4 className="text-lg font-bold mb-3">9. CHILDREN & FAMILY SAFETY</h4>

            <ul className="list-disc pl-6 mb-6 space-y-1">
                <li>Children must be supervised by a parent or guardian at all times</li>
                <li>Certain activities may have <span className="font-bold">age, height, or health restrictions</span></li>
                <li>Parents/guardians are fully responsible for minors under their care</li>
            </ul>

            <h4 className="text-lg font-bold mb-3">10. ANIMAL INTERACTION RULES (LADANG X)</h4>

            <p className="mb-3">To protect both visitors and animals:</p>
            <ul className="list-disc pl-6 mb-4 space-y-1">
                <li>Feeding animals is allowed <span className="font-bold">only</span> with approved feed</li>
                <li>Do not chase, frighten, or mistreat animals</li>
                <li>No loud noises, throwing objects, or aggressive behaviour</li>
                <li>Do not enter animal enclosures unless permitted</li>
                <li>Hands must be washed after animal contact</li>
            </ul>

            <p className="mb-6">
                Failure to comply may result in immediate removal from the park.
            </p>

            <h4 className="text-lg font-bold mb-3">11. GAMES, TOURS & DIGITAL EXPERIENCES</h4>

            <ul className="list-disc pl-6 mb-6 space-y-1">
                <li>Digital games, trails, and challenges are for <span className="font-bold">education and enjoyment</span></li>
                <li>Points, badges, or rewards have <span className="font-bold">no cash value</span> unless stated</li>
                <li>Manipulation or misuse of the App or games is prohibited</li>
                <li>Motomarin may modify or discontinue games at any time</li>
            </ul>

            <h4 className="text-lg font-bold mb-3">12. FOOD, PROPERTY & CLEANLINESS</h4>

            <ul className="list-disc pl-6 mb-6 space-y-1">
                <li>Outside food is restricted in certain areas</li>
                <li>Littering is strictly prohibited</li>
                <li>Damage to park property will result in liability for repair or replacement</li>
            </ul>

            <h4 className="text-lg font-bold mb-3">13. PHOTOGRAPHY & MEDIA</h4>

            <ul className="list-disc pl-6 mb-6 space-y-1">
                <li>Photography and video may be taken within the park</li>
                <li>Visitors may appear incidentally in marketing or promotional material</li>
                <li>Commercial photography requires prior written approval</li>
            </ul>

            <h4 className="text-lg font-bold mb-3">14. PROHIBITED ITEMS & BEHAVIOUR</h4>

            <p className="mb-3">The following are not allowed:</p>
            <ul className="list-disc pl-6 mb-6 space-y-1">
                <li>Alcohol, drugs, or illegal substances</li>
                <li>Weapons or dangerous items</li>
                <li>Smoking or vaping outside designated areas</li>
                <li>Disorderly, abusive, or unsafe behaviour</li>
            </ul>

            <h4 className="text-lg font-bold mb-3">15. LIABILITY & RISK ACKNOWLEDGEMENT</h4>

            <p className="mb-3">Visitors acknowledge that:</p>
            <ul className="list-disc pl-6 mb-4 space-y-1">
                <li>The park includes outdoor terrain, animals, and physical movement</li>
                <li>Entry and participation are <span className="font-bold">at own risk</span></li>
                <li>Separate <span className="font-bold">Waiver & Indemnity</span> applies for activities</li>
            </ul>

            <p className="mb-6">
                Motomarin is not liable except in cases of <span className="font-bold">proven gross negligence</span>.
            </p>

            <h4 className="text-lg font-bold mb-3">16. ENFORCEMENT</h4>

            <p className="mb-3">Motomarin reserves the right to:</p>
            <ul className="list-disc pl-6 mb-6 space-y-1">
                <li>Remove visitors without refund</li>
                <li>Suspend App access</li>
                <li>Take legal action where necessary</li>
            </ul>

            <h4 className="text-lg font-bold mb-3">17. GOVERNING LAW</h4>

            <p className="mb-6">
                These rules and policies are governed by the <span className="font-bold">laws of Malaysia</span>.
            </p>

            <h4 className="text-lg font-bold mb-3">18. CONTACT (PDPA & PARK MATTERS)</h4>

            <div className="mb-6">
                <p className="font-bold">Motomarin Sdn Bhd</p>
                <p>📧 Email: <a href="mailto:ladangxpark@gmail.com" className="text-blue-600 hover:underline">ladangxpark@gmail.com</a></p>
                <p>🌐 Website: [Insert Website]</p>
            </div>


        </div>
    )
}

const MalayTerms = () => {
    return (
        <div className="max-w-4xl pb-[12px] mx-auto">
            <h1 className="text-2xl font-bold text-center mb-2">MOTOMARIN SDN BHD</h1>

            <h2 className="text-xl font-bold text-center mb-3">DASAR PRIVASI & PERATURAN TAMAN</h2>

            <p className="text-center italic text-gray-700 mb-4">
                (Terpakai untuk X Park Malaysia & Ladang X)
            </p>

            <div className="mb-4">
                <p><span className="font-bold">Tarikh Berkuatkuasa:</span> 20/01/2026</p>
                <p><span className="font-bold">Kemas Kini Terakhir:</span> 20/01/2026</p>
            </div>

            <p className="mb-6">
                Dokumen ini terpakai untuk aplikasi mudah alih ("Aplikasi") yang dikendalikan oleh <span className="font-bold">Motomarin Sdn Bhd</span>, pemilik dan pengendali <span className="font-bold">X Park Malaysia</span> dan <span className="font-bold">Ladang X</span>.
            </p>

            <p className="mb-6">
                Dengan menggunakan Aplikasi, memasuki taman, atau mengambil bahagian dalam sebarang permainan atau aktiviti, anda bersetuju dengan syarat-syarat di bawah.
            </p>

            <h2 className="text-2xl font-bold text-center mb-4 mt-8">BAHAGIAN A</h2>

            <h3 className="text-xl font-bold text-center mb-6">DASAR PRIVASI (MEMATUHI PDPA)</h3>

            <p className="mb-6">
                Dasar Privasi ini dikeluarkan selaras dengan <span className="font-bold">Akta Perlindungan Data Peribadi 2010 (Malaysia)</span> ("PDPA").
            </p>

            <h4 className="text-lg font-bold mb-3">1. DATA PERIBADI YANG DIKUMPUL</h4>

            <p className="mb-3">Kami mungkin mengumpul data berikut melalui Aplikasi atau di tapak:</p>

            <p className="font-bold mb-2">a) Data Identiti & Hubungan</p>
            <ul className="list-disc pl-6 mb-4 space-y-1">
                <li>Nama</li>
                <li>Nombor telefon bimbit</li>
                <li>Alamat e-mel</li>
                <li>NRIC / Pasport (di mana diperlukan untuk keselamatan, insurans, atau tempahan)</li>
                <li>Umur / Tarikh lahir (terutamanya untuk aktiviti kanak-kanak)</li>
            </ul>

            <p className="font-bold mb-2">b) Data Aplikasi & Pengalaman</p>
            <ul className="list-disc pl-6 mb-4 space-y-1">
                <li>Tingkah laku penggunaan aplikasi</li>
                <li>Laluan lawatan, permainan yang diselesaikan, imbasan QR</li>
                <li>Mata, lencana, atau ganjaran yang diperoleh</li>
                <li>Sejarah tempahan dan penyertaan</li>
            </ul>

            <p className="font-bold mb-2">c) Data Peranti & Teknikal</p>
            <ul className="list-disc pl-6 mb-4 space-y-1">
                <li>Jenis peranti</li>
                <li>Alamat IP</li>
                <li>Data lokasi (jika diaktifkan)</li>
                <li>Analitik aplikasi dan laporan kerosakan</li>
            </ul>

            <div className="bg-yellow-100 border-l-4 border-yellow-500 p-4 mb-6">
                <p className="text-sm">
                    ⚠️ Butiran kad pembayaran <span className="font-bold">tidak disimpan</span>. Semua pembayaran dikendalikan melalui gateway pihak ketiga yang selamat.
                </p>
            </div>

            <h4 className="text-lg font-bold mb-3">2. TUJUAN PENGUMPULAN DATA</h4>

            <p className="mb-3">Data peribadi anda digunakan untuk:</p>
            <ul className="list-disc pl-6 mb-6 space-y-1">
                <li>Pendaftaran aplikasi dan pengesahan identiti</li>
                <li>Meningkatkan pengalaman taman (lawatan, permainan, jejak pembelajaran)</li>
                <li>Tempahan aktiviti dan pengurusan keselamatan</li>
                <li>Sokongan pelanggan</li>
                <li>Promosi, acara, dan pengumuman (pilihan keluar tersedia)</li>
                <li>Analitik operasi dan penambahbaikan perkhidmatan</li>
                <li>Keperluan undang-undang, peraturan, dan insurans</li>
            </ul>

            <h4 className="text-lg font-bold mb-3">3. PERSETUJUAN</h4>

            <p className="mb-3">Dengan:</p>
            <ul className="list-disc pl-6 mb-4 space-y-1">
                <li>Mendaftar akaun</li>
                <li>Menggunakan Aplikasi</li>
                <li>Menempah aktiviti</li>
                <li>Memasuki taman</li>
            </ul>

            <p className="mb-4">
                Anda <span className="font-bold">secara nyata bersetuju</span> dengan pengumpulan, penggunaan, dan pemprosesan data peribadi anda seperti yang diterangkan.
            </p>

            <p className="mb-6">
                Persetujuan boleh ditarik balik tertakluk kepada had undang-undang dan operasi.
            </p>

            <h4 className="text-lg font-bold mb-3">4. PENDEDAHAN DATA</h4>

            <p className="mb-3">Data peribadi mungkin didedahkan kepada:</p>
            <ul className="list-disc pl-6 mb-4 space-y-1">
                <li>Pasukan dalaman Motomarin</li>
                <li>Pengendali taman dan kakitangan keselamatan</li>
                <li>Vendor IT, pembekal analitik, dan gateway pembayaran</li>
                <li>Pembekal insurans</li>
                <li>Kerajaan atau pihak berkuasa pengawalseliaan apabila dikehendaki oleh undang-undang</li>
            </ul>

            <p className="mb-6">
                Motomarin <span className="font-bold">tidak menjual data peribadi</span>.
            </p>

            <h4 className="text-lg font-bold mb-3">5. PEMINDAHAN & PENYIMPANAN DATA</h4>

            <p className="mb-6">
                Data mungkin disimpan di pelayan awan yang selamat, termasuk pelayan yang terletak di luar Malaysia, dengan <span className="font-bold">perlindungan yang munasabah</span> selaras dengan piawaian PDPA.
            </p>

            <h4 className="text-lg font-bold mb-3">6. KESELAMATAN & PENGEKALAN DATA</h4>

            <ul className="list-disc pl-6 mb-6 space-y-1">
                <li>Perlindungan pentadbiran, teknikal, dan fizikal yang munasabah telah disediakan</li>
                <li>Data hanya disimpan selagi diperlukan</li>
                <li>Data dipadamkan atau dianonimkan dengan selamat apabila tidak diperlukan lagi</li>
            </ul>

            <h4 className="text-lg font-bold mb-3">7. HAK PENGGUNA (PDPA)</h4>

            <p className="mb-3">Anda berhak untuk:</p>
            <ul className="list-disc pl-6 mb-4 space-y-1">
                <li>Mengakses data peribadi anda</li>
                <li>Membetulkan data yang tidak tepat atau tidak lengkap</li>
                <li>Menarik balik persetujuan untuk komunikasi pemasaran</li>
            </ul>

            <p className="mb-6">
                Permintaan boleh dibuat melalui butiran hubungan di bawah.
            </p>

            <h2 className="text-2xl font-bold text-center mb-4 mt-8">BAHAGIAN B</h2>

            <h3 className="text-xl font-bold text-center mb-4">LADANG X -- PERATURAN TAMAN & KOD TINGKAH LAKU</h3>

            <p className="text-center italic text-gray-700 mb-6">
                (Peraturan Gaya Taman Tema)
            </p>

            <p className="mb-6">
                Ladang X adalah <span className="font-bold">tarikan berasaskan ladang yang mesra keluarga dan pendidikan</span>. Untuk keselamatan, keseronokan, dan kebajikan haiwan, peraturan berikut terpakai.
            </p>

            <h4 className="text-lg font-bold mb-3">8. PERATURAN AM TAMAN</h4>

            <p className="mb-3">Semua pelawat mesti:</p>
            <ul className="list-disc pl-6 mb-4 space-y-1">
                <li>Ikuti semua papan tanda taman dan arahan kakitangan</li>
                <li>Mengawasi kanak-kanak pada setiap masa</li>
                <li>Kekal dalam kawasan pelawat yang ditetapkan</li>
                <li>Memakai kasut dan pakaian yang sesuai</li>
                <li>Menghormati pelawat dan kakitangan lain</li>
            </ul>

            <p className="mb-6">
                Motomarin berhak untuk <span className="font-bold">menolak kemasukan atau mengeluarkan mana-mana individu</span> yang berkelakuan tidak selamat atau mengganggu.
            </p>

            <h4 className="text-lg font-bold mb-3">9. KESELAMATAN KANAK-KANAK & KELUARGA</h4>

            <ul className="list-disc pl-6 mb-6 space-y-1">
                <li>Kanak-kanak mesti diawasi oleh ibu bapa atau penjaga pada setiap masa</li>
                <li>Aktiviti tertentu mungkin mempunyai <span className="font-bold">sekatan umur, ketinggian, atau kesihatan</span></li>
                <li>Ibu bapa/penjaga bertanggungjawab sepenuhnya terhadap kanak-kanak di bawah jagaan mereka</li>
            </ul>

            <h4 className="text-lg font-bold mb-3">10. PERATURAN INTERAKSI HAIWAN (LADANG X)</h4>

            <p className="mb-3">Untuk melindungi pelawat dan haiwan:</p>
            <ul className="list-disc pl-6 mb-4 space-y-1">
                <li>Memberi makan haiwan hanya dibenarkan dengan makanan yang diluluskan <span className="font-bold">sahaja</span></li>
                <li>Jangan mengejar, menakutkan, atau menganiaya haiwan</li>
                <li>Tiada bunyi bising, melempar objek, atau tingkah laku agresif</li>
                <li>Jangan memasuki kandang haiwan melainkan dibenarkan</li>
                <li>Tangan mesti dibasuh selepas sentuhan dengan haiwan</li>
            </ul>

            <p className="mb-6">
                Kegagalan mematuhi boleh mengakibatkan penyingkiran serta-merta dari taman.
            </p>

            <h4 className="text-lg font-bold mb-3">11. PERMAINAN, LAWATAN & PENGALAMAN DIGITAL</h4>

            <ul className="list-disc pl-6 mb-6 space-y-1">
                <li>Permainan digital, jejak, dan cabaran adalah untuk <span className="font-bold">pendidikan dan keseronokan</span></li>
                <li>Mata, lencana, atau ganjaran <span className="font-bold">tidak mempunyai nilai tunai</span> melainkan dinyatakan</li>
                <li>Manipulasi atau penyalahgunaan Aplikasi atau permainan adalah dilarang</li>
                <li>Motomarin boleh mengubah suai atau menghentikan permainan pada bila-bila masa</li>
            </ul>

            <h4 className="text-lg font-bold mb-3">12. MAKANAN, HARTA BENDA & KEBERSIHAN</h4>

            <ul className="list-disc pl-6 mb-6 space-y-1">
                <li>Makanan luar terhad di kawasan tertentu</li>
                <li>Membuang sampah adalah dilarang sama sekali</li>
                <li>Kerosakan pada harta taman akan mengakibatkan liabiliti untuk pembaikan atau penggantian</li>
            </ul>

            <h4 className="text-lg font-bold mb-3">13. FOTOGRAFI & MEDIA</h4>

            <ul className="list-disc pl-6 mb-6 space-y-1">
                <li>Fotografi dan video boleh diambil dalam taman</li>
                <li>Pelawat mungkin muncul secara kebetulan dalam bahan pemasaran atau promosi</li>
                <li>Fotografi komersial memerlukan kelulusan bertulis terlebih dahulu</li>
            </ul>

            <h4 className="text-lg font-bold mb-3">14. BARANGAN & TINGKAH LAKU YANG DILARANG</h4>

            <p className="mb-3">Yang berikut tidak dibenarkan:</p>
            <ul className="list-disc pl-6 mb-6 space-y-1">
                <li>Alkohol, dadah, atau bahan haram</li>
                <li>Senjata atau barangan berbahaya</li>
                <li>Merokok atau vape di luar kawasan yang ditetapkan</li>
                <li>Tingkah laku tidak teratur, kasar, atau tidak selamat</li>
            </ul>

            <h4 className="text-lg font-bold mb-3">15. LIABILITI & PENGAKUAN RISIKO</h4>

            <p className="mb-3">Pelawat mengakui bahawa:</p>
            <ul className="list-disc pl-6 mb-4 space-y-1">
                <li>Taman merangkumi rupa bumi luar, haiwan, dan pergerakan fizikal</li>
                <li>Kemasukan dan penyertaan adalah <span className="font-bold">atas risiko sendiri</span></li>
                <li><span className="font-bold">Penepian & Indemniti</span> berasingan terpakai untuk aktiviti</li>
            </ul>

            <p className="mb-6">
                Motomarin tidak bertanggungjawab kecuali dalam kes <span className="font-bold">kecuaian besar yang terbukti</span>.
            </p>

            <h4 className="text-lg font-bold mb-3">16. PENGUATKUASAAN</h4>

            <p className="mb-3">Motomarin berhak untuk:</p>
            <ul className="list-disc pl-6 mb-6 space-y-1">
                <li>Mengeluarkan pelawat tanpa bayaran balik</li>
                <li>Menggantung akses Aplikasi</li>
                <li>Mengambil tindakan undang-undang di mana perlu</li>
            </ul>

            <h4 className="text-lg font-bold mb-3">17. UNDANG-UNDANG YANG MENTADBIR</h4>

            <p className="mb-6">
                Peraturan dan dasar ini ditadbir oleh <span className="font-bold">undang-undang Malaysia</span>.
            </p>

            <h4 className="text-lg font-bold mb-3">18. HUBUNGAN (PDPA & HAL TAMAN)</h4>

            <div className="mb-6">
                <p className="font-bold">Motomarin Sdn Bhd</p>
                <p>📧 E-mel: <a href="mailto:ladangxpark@gmail.com" className="text-blue-600 hover:underline">ladangxpark@gmail.com</a></p>
                <p>🌐 Laman web: [Insert Website]</p>
            </div>


        </div>
    )
}