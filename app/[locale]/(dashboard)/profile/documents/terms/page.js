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
        <div className="p-6 max-w-4xl mx-auto">
            <p className="text-sm text-gray-600 mb-4">Last updated: 16 Dec 2025</p>

            <p className="mb-4">
                This Terms & Conditions explains how we collect, use, and protect your information when you use our application or website ("Service").
            </p>

            <div className="bg-yellow-100 border-l-4 border-yellow-500 p-4 mb-6">
                <p className="text-sm">
                    ⚠️ This is a sample privacy policy for demonstration purposes only and does not constitute legal advice.
                </p>
            </div>

            <h2 className="text-xl font-bold mb-3">1. Information We Collect</h2>
            <p className="mb-3">We may collect the following types of information:</p>
            <ul className="list-disc pl-6 mb-6 space-y-2">
                <li>
                    <b>Personal Information</b>
                    <br />
                    Such as name, email address, or contact details (if provided by you).
                </li>
                <li>
                    <b>Usage Data</b>
                    <br />
                    Information on how you interact with the Service, including pages visited, features used, and time spent.
                </li>
                <li>
                    <b>Device Information</b>
                    <br />
                    Such as device type, operating system, and app version.
                </li>
            </ul>

            <h2 className="text-xl font-bold mb-3">2. How We Use Your Information</h2>
            <p className="mb-3">We use the collected information to:</p>
            <ul className="list-disc pl-6 mb-6 space-y-2">
                <li>Provide and maintain the Service</li>
                <li>Improve user experience and app functionality</li>
                <li>Communicate with users (if applicable)</li>
                <li>Ensure security and prevent misuse</li>
            </ul>

            <h2 className="text-xl font-bold mb-3">3. Data Storage and Security</h2>
            <p className="mb-6">
                We take reasonable measures to protect your information from unauthorized access, alteration, or disclosure. However, no method of transmission over the internet is 100% secure.
            </p>
        </div>
    )
}

const MalayTerms = () => {
    return (
        <div className="p-6 max-w-4xl mx-auto">
            <p className="text-sm text-gray-600 mb-4">Kemas kini terakhir: 16 Dis 2025</p>

            <p className="mb-4">
                Terma & Syarat ini menerangkan bagaimana kami mengumpul, menggunakan, dan melindungi maklumat anda apabila anda menggunakan aplikasi atau laman web kami ("Perkhidmatan").
            </p>

            <div className="bg-yellow-100 border-l-4 border-yellow-500 p-4 mb-6">
                <p className="text-sm">
                    ⚠️ Ini adalah contoh dasar privasi untuk tujuan demonstrasi sahaja dan tidak merupakan nasihat undang-undang.
                </p>
            </div>

            <h2 className="text-xl font-bold mb-3">1. Maklumat Yang Kami Kumpulkan</h2>
            <p className="mb-3">Kami mungkin mengumpul jenis maklumat berikut:</p>
            <ul className="list-disc pl-6 mb-6 space-y-2">
                <li>
                    <b>Maklumat Peribadi</b>
                    <br />
                    Seperti nama, alamat e-mel, atau butiran hubungan (jika diberikan oleh anda).
                </li>
                <li>
                    <b>Data Penggunaan</b>
                    <br />
                    Maklumat tentang bagaimana anda berinteraksi dengan Perkhidmatan, termasuk halaman yang dilawati, ciri yang digunakan, dan masa yang dihabiskan.
                </li>
                <li>
                    <b>Maklumat Peranti</b>
                    <br />
                    Seperti jenis peranti, sistem pengendalian, dan versi aplikasi.
                </li>
            </ul>

            <h2 className="text-xl font-bold mb-3">2. Bagaimana Kami Menggunakan Maklumat Anda</h2>
            <p className="mb-3">Kami menggunakan maklumat yang dikumpul untuk:</p>
            <ul className="list-disc pl-6 mb-6 space-y-2">
                <li>Menyediakan dan mengekalkan Perkhidmatan</li>
                <li>Meningkatkan pengalaman pengguna dan fungsi aplikasi</li>
                <li>Berkomunikasi dengan pengguna (jika berkenaan)</li>
                <li>Memastikan keselamatan dan mencegah penyalahgunaan</li>
            </ul>

            <h2 className="text-xl font-bold mb-3">3. Penyimpanan dan Keselamatan Data</h2>
            <p className="mb-6">
                Kami mengambil langkah yang munasabah untuk melindungi maklumat anda daripada akses, pengubahan, atau pendedahan tanpa kebenaran. Walau bagaimanapun, tiada kaedah penghantaran melalui internet adalah 100% selamat.
            </p>
        </div>
    )
}