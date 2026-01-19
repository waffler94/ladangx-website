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
        <div className="max-w-4xl mx-auto">
            <h1 className="text-2xl font-bold text-center mb-2">MOTOMARIN SDN BHD</h1>

            <h2 className="text-xl font-bold text-center mb-2">MOBILE APPLICATION</h2>

            <h3 className="text-xl font-bold text-center mb-6">TERMS & CONDITIONS OF USE</h3>

            <div className="mb-4">
                <p><span className="font-bold">Effective Date:</span> [Insert Date]</p>
                <p><span className="font-bold">Last Updated:</span> [Insert Date]</p>
            </div>

            <p className="mb-4">
                This Mobile Application ("App") is owned and operated by <span className="font-bold">Motomarin Sdn Bhd</span> ("Motomarin", "we", "us", "our").
            </p>

            <p className="mb-4">Motomarin Sdn Bhd owns, builds, manages, and operates:</p>
            <ul className="list-disc pl-6 mb-6 space-y-1">
                <li><span className="font-bold">X Park Malaysia</span></li>
                <li><span className="font-bold">Ladang X</span></li>
            </ul>

            <p className="mb-4">
                By downloading, accessing, or using this App, you agree to be bound by these <span className="font-bold">Terms & Conditions</span>, our <span className="font-bold">Privacy Policy</span>, and any related <span className="font-bold">Waiver & Indemnity</span> presented in-app.
            </p>

            <p className="mb-6">
                If you do not agree, please do not use the App.
            </p>

            <h4 className="text-lg font-bold mb-3">1. PURPOSE OF THE APP</h4>

            <p className="mb-3">This App is designed to enhance user experience across X Park Malaysia and Ladang X, including but not limited to:</p>
            <ul className="list-disc pl-6 mb-6 space-y-1">
                <li>Park information and navigation</li>
                <li>Digital tours and trails</li>
                <li>Interactive games and learning experiences</li>
                <li>Activity previews and participation guidance</li>
                <li>Bookings, reservations, and promotions</li>
                <li>Educational and experiential content</li>
                <li>User engagement features</li>
            </ul>

            <h4 className="text-lg font-bold mb-3">2. ELIGIBILITY</h4>

            <ul className="list-disc pl-6 mb-6 space-y-1">
                <li>Users must be <span className="font-bold">18 years or older</span>, or have <span className="font-bold">parental / guardian consent</span></li>
                <li>Parents or guardians are responsible for minors using the App</li>
                <li>Users must provide accurate and truthful information</li>
            </ul>

            <h4 className="text-lg font-bold mb-3">3. USER ACCOUNTS</h4>

            <p className="mb-3">To access certain features, you may be required to register an account.</p>

            <p className="mb-3">You agree to:</p>
            <ul className="list-disc pl-6 mb-4 space-y-1">
                <li>Maintain confidentiality of login credentials</li>
                <li>Accept responsibility for all activities under your account</li>
                <li>Notify Motomarin immediately of unauthorized use</li>
            </ul>

            <p className="mb-6">
                Motomarin reserves the right to suspend or terminate accounts for misuse.
            </p>

            <h4 className="text-lg font-bold mb-3">4. ACCEPTABLE USE</h4>

            <p className="mb-3">You agree NOT to:</p>
            <ul className="list-disc pl-6 mb-6 space-y-1">
                <li>Misuse, hack, reverse engineer, or disrupt the App</li>
                <li>Manipulate games, scoring systems, or digital experiences</li>
                <li>Upload false, harmful, or misleading content</li>
                <li>Use the App for unlawful or commercial purposes without consent</li>
                <li>Interfere with safety instructions, tours, or activity guidelines</li>
            </ul>

            <h4 className="text-lg font-bold mb-3">5. DIGITAL GAMES, TOURS & EXPERIENCES</h4>

            <p className="mb-3">The App may include:</p>
            <ul className="list-disc pl-6 mb-4 space-y-1">
                <li>Park-based digital games</li>
                <li>Educational trails</li>
                <li>QR-based experiences</li>
                <li>Interactive challenges</li>
                <li>Reward or point-based features</li>
            </ul>

            <p className="mb-3">You acknowledge that:</p>
            <ul className="list-disc pl-6 mb-6 space-y-1">
                <li>Games are for <span className="font-bold">entertainment and engagement only</span></li>
                <li>Results, scores, rewards, or achievements have <span className="font-bold">no monetary value</span> unless explicitly stated</li>
                <li>Motomarin may modify, suspend, or remove any game or feature at any time</li>
            </ul>

            <h4 className="text-lg font-bold mb-3">6. BOOKINGS, ACTIVITIES & PARTICIPATION</h4>

            <p className="mb-3">Certain activities require:</p>
            <ul className="list-disc pl-6 mb-4 space-y-1">
                <li>Advance booking</li>
                <li>Acceptance of a <span className="font-bold">Waiver & Indemnity</span></li>
                <li>Compliance with safety rules and staff instructions</li>
            </ul>

            <p className="mb-3">Motomarin reserves the right to:</p>
            <ul className="list-disc pl-6 mb-6 space-y-1">
                <li>Refuse participation for safety reasons</li>
                <li>Modify activities due to weather, safety, or operational needs</li>
                <li>Remove users for unsafe or disruptive behaviour</li>
            </ul>

            <h4 className="text-lg font-bold mb-3">7. SAFETY & PERSONAL RESPONSIBILITY</h4>

            <p className="mb-3">You acknowledge that:</p>
            <ul className="list-disc pl-6 mb-4 space-y-1">
                <li>Activities may involve physical movement, outdoor conditions, animals, equipment, or terrain</li>
                <li>Participation is <span className="font-bold">voluntary and at your own risk</span></li>
                <li>You must comply with all safety signage and instructions</li>
            </ul>

            <p className="mb-6">
                Separate <span className="font-bold">Waiver & Indemnity</span> acceptance is mandatory for activity participation.
            </p>

            <h4 className="text-lg font-bold mb-3">8. INTELLECTUAL PROPERTY</h4>

            <p className="mb-3">All content in the App, including but not limited to:</p>
            <ul className="list-disc pl-6 mb-4 space-y-1">
                <li>Brand names</li>
                <li>Logos</li>
                <li>Trademarks</li>
                <li>Text, graphics, videos</li>
                <li>Audio, animations</li>
                <li>App structure, UI/UX, games, and logic</li>
            </ul>

            <p className="mb-4">
                are the <span className="font-bold">exclusive intellectual property of Motomarin Sdn Bhd</span>.
            </p>

            <p className="mb-3">You may not:</p>
            <ul className="list-disc pl-6 mb-6 space-y-1">
                <li>Copy, reproduce, modify, distribute, or commercially exploit any content</li>
                <li>Use X Park Malaysia or Ladang X branding without written permission</li>
            </ul>

            <h4 className="text-lg font-bold mb-3">9. APP DEVELOPMENT & OWNERSHIP</h4>

            <p className="mb-3">All custom-developed elements of this App, including:</p>
            <ul className="list-disc pl-6 mb-4 space-y-1">
                <li>Source code</li>
                <li>UI/UX</li>
                <li>Databases</li>
                <li>Game mechanics</li>
                <li>User flows</li>
                <li>Admin systems</li>
            </ul>

            <p className="mb-4">
                are owned exclusively by <span className="font-bold">Motomarin Sdn Bhd</span>, unless otherwise agreed in writing.
            </p>

            <p className="mb-6">
                Developers may not reuse or replicate proprietary designs or logic.
            </p>

            <h4 className="text-lg font-bold mb-3">10. USER CONTENT</h4>

            <p className="mb-3">If you submit:</p>
            <ul className="list-disc pl-6 mb-4 space-y-1">
                <li>Photos</li>
                <li>Videos</li>
                <li>Reviews</li>
                <li>Feedback</li>
                <li>Comments</li>
            </ul>

            <p className="mb-6">
                You grant Motomarin a <span className="font-bold">royalty-free, worldwide, perpetual license</span> to use such content for operational, marketing, and promotional purposes.
            </p>

            <h4 className="text-lg font-bold mb-3">11. DATA PROTECTION (PDPA)</h4>

            <p className="mb-4">
                Personal data is collected and processed in accordance with the <span className="font-bold">Personal Data Protection Act 2010 (Malaysia)</span>.
            </p>

            <p className="mb-3">Please refer to our <span className="font-bold">Privacy Policy</span> for details on:</p>
            <ul className="list-disc pl-6 mb-6 space-y-1">
                <li>Data collection</li>
                <li>Usage</li>
                <li>Storage</li>
                <li>Access and correction rights</li>
            </ul>

            <h4 className="text-lg font-bold mb-3">12. THIRD-PARTY SERVICES</h4>

            <p className="mb-3">The App may integrate third-party services such as:</p>
            <ul className="list-disc pl-6 mb-4 space-y-1">
                <li>Payment gateways</li>
                <li>Maps</li>
                <li>Analytics tools</li>
            </ul>

            <p className="mb-6">
                Motomarin is not responsible for third-party service failures or content.
            </p>

            <h4 className="text-lg font-bold mb-3">13. LIMITATION OF LIABILITY</h4>

            <p className="mb-3">To the fullest extent permitted by law:</p>
            <ul className="list-disc pl-6 mb-6 space-y-1">
                <li>Motomarin shall not be liable for indirect, incidental, or consequential losses</li>
                <li>Liability is limited to the amount paid by the user (if any) within the last 12 months</li>
                <li>Nothing excludes liability for proven gross negligence or wilful misconduct</li>
            </ul>

            <h4 className="text-lg font-bold mb-3">14. TERMINATION & SUSPENSION</h4>

            <p className="mb-3">Motomarin reserves the right to:</p>
            <ul className="list-disc pl-6 mb-6 space-y-1">
                <li>Suspend or terminate access without notice</li>
                <li>Remove accounts that breach these Terms</li>
                <li>Restrict features for maintenance or security</li>
            </ul>

            <h4 className="text-lg font-bold mb-3">15. CHANGES TO TERMS</h4>

            <p className="mb-4">Motomarin may update these Terms at any time.</p>
            <p className="mb-6">Continued use of the App constitutes acceptance of updated Terms.</p>

            <h4 className="text-lg font-bold mb-3">16. GOVERNING LAW</h4>

            <p className="mb-6">
                These Terms are governed by the <span className="font-bold">laws of Malaysia</span>, and Malaysian courts shall have exclusive jurisdiction.
            </p>

            <h4 className="text-lg font-bold mb-3">17. CONTACT DETAILS</h4>

            <div className="mb-6">
                <p className="font-bold">Motomarin Sdn Bhd</p>
                <p>📧 Email: [Insert Official Email]</p>
                <p>🌐 Website: [Insert Website]</p>
            </div>

            <h4 className="text-lg font-bold mb-3">IN-APP ACCEPTANCE (MANDATORY)</h4>

            <div className="mb-4 space-y-2">
                <div className="flex items-start">
                    <span className="mr-2">☐</span>
                    <p>I agree to the <span className="font-bold">Terms & Conditions</span></p>
                </div>
                <div className="flex items-start">
                    <span className="mr-2">☐</span>
                    <p>I agree to the <span className="font-bold">Privacy Policy</span></p>
                </div>
                <div className="flex items-start">
                    <span className="mr-2">☐</span>
                    <p>I agree to the <span className="font-bold">Waiver & Indemnity</span> (for activities)</p>
                </div>
            </div>

            <div className="text-center mt-6">
                <p className="font-bold">[PROCEED]</p>
            </div>

            <hr className="my-8 border-gray-300" />

            <h4 className="text-lg font-bold mb-3">Contact Us</h4>
            <p className="mb-6">
                For questions, concerns, or requests related to this Privacy Policy or your personal data, please contact us at <a href="tel:+60115532282" className="text-blue-600 hover:underline font-semibold">011-5553 2282</a>.
            </p>
        </div>
    )
}

const MalayTerms = () => {
    return (
        <div className="max-w-4xl mx-auto">
            <h1 className="text-2xl font-bold text-center mb-2">MOTOMARIN SDN BHD</h1>

            <h2 className="text-xl font-bold text-center mb-2">APLIKASI MUDAH ALIH</h2>

            <h3 className="text-xl font-bold text-center mb-6">TERMA & SYARAT PENGGUNAAN</h3>

            <div className="mb-4">
                <p><span className="font-bold">Tarikh Berkuatkuasa:</span> [Masukkan Tarikh]</p>
                <p><span className="font-bold">Kemas Kini Terakhir:</span> [Masukkan Tarikh]</p>
            </div>

            <p className="mb-4">
                Aplikasi Mudah Alih ini ("Aplikasi") dimiliki dan dikendalikan oleh <span className="font-bold">Motomarin Sdn Bhd</span> ("Motomarin", "kami", "kita", "milik kami").
            </p>

            <p className="mb-4">Motomarin Sdn Bhd memiliki, membina, mengurus, dan mengendalikan:</p>
            <ul className="list-disc pl-6 mb-6 space-y-1">
                <li><span className="font-bold">X Park Malaysia</span></li>
                <li><span className="font-bold">Ladang X</span></li>
            </ul>

            <p className="mb-4">
                Dengan memuat turun, mengakses, atau menggunakan Aplikasi ini, anda bersetuju untuk terikat dengan <span className="font-bold">Terma & Syarat</span> ini, <span className="font-bold">Dasar Privasi</span> kami, dan sebarang <span className="font-bold">Penepian & Indemniti</span> yang berkaitan yang dibentangkan dalam aplikasi.
            </p>

            <p className="mb-6">
                Jika anda tidak bersetuju, sila jangan gunakan Aplikasi.
            </p>

            <h4 className="text-lg font-bold mb-3">1. TUJUAN APLIKASI</h4>

            <p className="mb-3">Aplikasi ini direka untuk meningkatkan pengalaman pengguna di X Park Malaysia dan Ladang X, termasuk tetapi tidak terhad kepada:</p>
            <ul className="list-disc pl-6 mb-6 space-y-1">
                <li>Maklumat dan navigasi taman</li>
                <li>Lawatan dan jejak digital</li>
                <li>Permainan interaktif dan pengalaman pembelajaran</li>
                <li>Pratonton aktiviti dan panduan penyertaan</li>
                <li>Tempahan, reservasi, dan promosi</li>
                <li>Kandungan pendidikan dan pengalaman</li>
                <li>Ciri penglibatan pengguna</li>
            </ul>

            <h4 className="text-lg font-bold mb-3">2. KELAYAKAN</h4>

            <ul className="list-disc pl-6 mb-6 space-y-1">
                <li>Pengguna mestilah <span className="font-bold">18 tahun atau lebih tua</span>, atau mempunyai <span className="font-bold">persetujuan ibu bapa / penjaga</span></li>
                <li>Ibu bapa atau penjaga bertanggungjawab untuk kanak-kanak yang menggunakan Aplikasi</li>
                <li>Pengguna mesti memberikan maklumat yang tepat dan benar</li>
            </ul>

            <h4 className="text-lg font-bold mb-3">3. AKAUN PENGGUNA</h4>

            <p className="mb-3">Untuk mengakses ciri tertentu, anda mungkin dikehendaki mendaftar akaun.</p>

            <p className="mb-3">Anda bersetuju untuk:</p>
            <ul className="list-disc pl-6 mb-4 space-y-1">
                <li>Mengekalkan kerahsiaan kelayakan log masuk</li>
                <li>Menerima tanggungjawab untuk semua aktiviti di bawah akaun anda</li>
                <li>Memaklumkan Motomarin dengan segera tentang penggunaan tanpa kebenaran</li>
            </ul>

            <p className="mb-6">
                Motomarin berhak untuk menggantung atau menamatkan akaun kerana penyalahgunaan.
            </p>

            <h4 className="text-lg font-bold mb-3">4. PENGGUNAAN YANG BOLEH DITERIMA</h4>

            <p className="mb-3">Anda bersetuju untuk TIDAK:</p>
            <ul className="list-disc pl-6 mb-6 space-y-1">
                <li>Menyalahgunakan, menggodam, kejuruteraan terbalik, atau mengganggu Aplikasi</li>
                <li>Memanipulasi permainan, sistem pemarkahan, atau pengalaman digital</li>
                <li>Memuat naik kandungan palsu, berbahaya, atau mengelirukan</li>
                <li>Menggunakan Aplikasi untuk tujuan yang menyalahi undang-undang atau komersial tanpa persetujuan</li>
                <li>Mengganggu arahan keselamatan, lawatan, atau garis panduan aktiviti</li>
            </ul>

            <h4 className="text-lg font-bold mb-3">5. PERMAINAN DIGITAL, LAWATAN & PENGALAMAN</h4>

            <p className="mb-3">Aplikasi mungkin termasuk:</p>
            <ul className="list-disc pl-6 mb-4 space-y-1">
                <li>Permainan digital berasaskan taman</li>
                <li>Jejak pendidikan</li>
                <li>Pengalaman berasaskan QR</li>
                <li>Cabaran interaktif</li>
                <li>Ciri berasaskan ganjaran atau mata</li>
            </ul>

            <p className="mb-3">Anda mengakui bahawa:</p>
            <ul className="list-disc pl-6 mb-6 space-y-1">
                <li>Permainan adalah untuk <span className="font-bold">hiburan dan penglibatan sahaja</span></li>
                <li>Keputusan, skor, ganjaran, atau pencapaian <span className="font-bold">tidak mempunyai nilai kewangan</span> melainkan dinyatakan secara eksplisit</li>
                <li>Motomarin boleh mengubah suai, menggantung, atau mengeluarkan sebarang permainan atau ciri pada bila-bila masa</li>
            </ul>

            <h4 className="text-lg font-bold mb-3">6. TEMPAHAN, AKTIVITI & PENYERTAAN</h4>

            <p className="mb-3">Aktiviti tertentu memerlukan:</p>
            <ul className="list-disc pl-6 mb-4 space-y-1">
                <li>Tempahan awal</li>
                <li>Penerimaan <span className="font-bold">Penepian & Indemniti</span></li>
                <li>Pematuhan dengan peraturan keselamatan dan arahan kakitangan</li>
            </ul>

            <p className="mb-3">Motomarin berhak untuk:</p>
            <ul className="list-disc pl-6 mb-6 space-y-1">
                <li>Menolak penyertaan atas sebab keselamatan</li>
                <li>Mengubah suai aktiviti disebabkan cuaca, keselamatan, atau keperluan operasi</li>
                <li>Mengeluarkan pengguna kerana tingkah laku tidak selamat atau mengganggu</li>
            </ul>

            <h4 className="text-lg font-bold mb-3">7. KESELAMATAN & TANGGUNGJAWAB PERIBADI</h4>

            <p className="mb-3">Anda mengakui bahawa:</p>
            <ul className="list-disc pl-6 mb-4 space-y-1">
                <li>Aktiviti mungkin melibatkan pergerakan fizikal, keadaan luar, haiwan, peralatan, atau rupa bumi</li>
                <li>Penyertaan adalah <span className="font-bold">secara sukarela dan atas risiko anda sendiri</span></li>
                <li>Anda mesti mematuhi semua papan tanda dan arahan keselamatan</li>
            </ul>

            <p className="mb-6">
                Penerimaan <span className="font-bold">Penepian & Indemniti</span> berasingan adalah wajib untuk penyertaan aktiviti.
            </p>

            <h4 className="text-lg font-bold mb-3">8. HARTA INTELEK</h4>

            <p className="mb-3">Semua kandungan dalam Aplikasi, termasuk tetapi tidak terhad kepada:</p>
            <ul className="list-disc pl-6 mb-4 space-y-1">
                <li>Nama jenama</li>
                <li>Logo</li>
                <li>Cap dagangan</li>
                <li>Teks, grafik, video</li>
                <li>Audio, animasi</li>
                <li>Struktur aplikasi, UI/UX, permainan, dan logik</li>
            </ul>

            <p className="mb-4">
                adalah <span className="font-bold">harta intelek eksklusif Motomarin Sdn Bhd</span>.
            </p>

            <p className="mb-3">Anda tidak boleh:</p>
            <ul className="list-disc pl-6 mb-6 space-y-1">
                <li>Menyalin, menghasilkan semula, mengubah suai, mengedarkan, atau mengeksploitasi mana-mana kandungan secara komersial</li>
                <li>Menggunakan jenama X Park Malaysia atau Ladang X tanpa kebenaran bertulis</li>
            </ul>

            <h4 className="text-lg font-bold mb-3">9. PEMBANGUNAN & PEMILIKAN APLIKASI</h4>

            <p className="mb-3">Semua elemen yang dibangunkan khas untuk Aplikasi ini, termasuk:</p>
            <ul className="list-disc pl-6 mb-4 space-y-1">
                <li>Kod sumber</li>
                <li>UI/UX</li>
                <li>Pangkalan data</li>
                <li>Mekanik permainan</li>
                <li>Aliran pengguna</li>
                <li>Sistem pentadbiran</li>
            </ul>

            <p className="mb-4">
                dimiliki secara eksklusif oleh <span className="font-bold">Motomarin Sdn Bhd</span>, melainkan dipersetujui sebaliknya secara bertulis.
            </p>

            <p className="mb-6">
                Pembangun tidak boleh menggunakan semula atau mereplikasi reka bentuk atau logik proprietari.
            </p>

            <h4 className="text-lg font-bold mb-3">10. KANDUNGAN PENGGUNA</h4>

            <p className="mb-3">Jika anda menghantar:</p>
            <ul className="list-disc pl-6 mb-4 space-y-1">
                <li>Foto</li>
                <li>Video</li>
                <li>Ulasan</li>
                <li>Maklum balas</li>
                <li>Komen</li>
            </ul>

            <p className="mb-6">
                Anda memberikan Motomarin <span className="font-bold">lesen bebas royalti, di seluruh dunia, kekal</span> untuk menggunakan kandungan tersebut untuk tujuan operasi, pemasaran, dan promosi.
            </p>

            <h4 className="text-lg font-bold mb-3">11. PERLINDUNGAN DATA (PDPA)</h4>

            <p className="mb-4">
                Data peribadi dikumpul dan diproses mengikut <span className="font-bold">Akta Perlindungan Data Peribadi 2010 (Malaysia)</span>.
            </p>

            <p className="mb-3">Sila rujuk <span className="font-bold">Dasar Privasi</span> kami untuk butiran mengenai:</p>
            <ul className="list-disc pl-6 mb-6 space-y-1">
                <li>Pengumpulan data</li>
                <li>Penggunaan</li>
                <li>Penyimpanan</li>
                <li>Hak akses dan pembetulan</li>
            </ul>

            <h4 className="text-lg font-bold mb-3">12. PERKHIDMATAN PIHAK KETIGA</h4>

            <p className="mb-3">Aplikasi mungkin mengintegrasikan perkhidmatan pihak ketiga seperti:</p>
            <ul className="list-disc pl-6 mb-4 space-y-1">
                <li>Gateway pembayaran</li>
                <li>Peta</li>
                <li>Alat analitik</li>
            </ul>

            <p className="mb-6">
                Motomarin tidak bertanggungjawab untuk kegagalan atau kandungan perkhidmatan pihak ketiga.
            </p>

            <h4 className="text-lg font-bold mb-3">13. BATASAN LIABILITI</h4>

            <p className="mb-3">Sepenuhnya mengikut undang-undang yang dibenarkan:</p>
            <ul className="list-disc pl-6 mb-6 space-y-1">
                <li>Motomarin tidak akan bertanggungjawab untuk kerugian tidak langsung, sampingan, atau berbangkit</li>
                <li>Liabiliti terhad kepada jumlah yang dibayar oleh pengguna (jika ada) dalam tempoh 12 bulan yang lalu</li>
                <li>Tiada apa-apa yang mengecualikan liabiliti untuk kecuaian besar yang terbukti atau salah laku yang disengajakan</li>
            </ul>

            <h4 className="text-lg font-bold mb-3">14. PENAMATAN & PENGGANTUNGAN</h4>

            <p className="mb-3">Motomarin berhak untuk:</p>
            <ul className="list-disc pl-6 mb-6 space-y-1">
                <li>Menggantung atau menamatkan akses tanpa notis</li>
                <li>Mengeluarkan akaun yang melanggar Terma ini</li>
                <li>Menghadkan ciri untuk penyelenggaraan atau keselamatan</li>
            </ul>

            <h4 className="text-lg font-bold mb-3">15. PERUBAHAN PADA TERMA</h4>

            <p className="mb-4">Motomarin boleh mengemas kini Terma ini pada bila-bila masa.</p>
            <p className="mb-6">Penggunaan berterusan Aplikasi merupakan penerimaan Terma yang dikemas kini.</p>

            <h4 className="text-lg font-bold mb-3">16. UNDANG-UNDANG YANG MENTADBIR</h4>

            <p className="mb-6">
                Terma ini ditadbir oleh <span className="font-bold">undang-undang Malaysia</span>, dan mahkamah Malaysia akan mempunyai bidang kuasa eksklusif.
            </p>

            <h4 className="text-lg font-bold mb-3">17. BUTIRAN HUBUNGAN</h4>

            <div className="mb-6">
                <p className="font-bold">Motomarin Sdn Bhd</p>
                <p>📧 E-mel: [Masukkan E-mel Rasmi]</p>
                <p>🌐 Laman web: [Masukkan Laman Web]</p>
            </div>

            <h4 className="text-lg font-bold mb-3">PENERIMAAN DALAM APLIKASI (WAJIB)</h4>

            <div className="mb-4 space-y-2">
                <div className="flex items-start">
                    <span className="mr-2">☐</span>
                    <p>Saya bersetuju dengan <span className="font-bold">Terma & Syarat</span></p>
                </div>
                <div className="flex items-start">
                    <span className="mr-2">☐</span>
                    <p>Saya bersetuju dengan <span className="font-bold">Dasar Privasi</span></p>
                </div>
                <div className="flex items-start">
                    <span className="mr-2">☐</span>
                    <p>Saya bersetuju dengan <span className="font-bold">Penepian & Indemniti</span> (untuk aktiviti)</p>
                </div>
            </div>

            <div className="text-center mt-6">
                <p className="font-bold">[TERUSKAN]</p>
            </div>

            <hr className="my-8 border-gray-300" />

            <h4 className="text-lg font-bold mb-3">Hubungi Kami</h4>
            <p className="mb-6">
                Untuk pertanyaan, kebimbangan, atau permintaan berkaitan Dasar Privasi ini atau data peribadi anda, sila hubungi kami di <a href="tel:+60115532282" className="text-blue-600 hover:underline font-semibold">011-5553 2282</a>.
            </p>
        </div>
    )
}