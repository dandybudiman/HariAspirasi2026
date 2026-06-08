const GOOGLE_SHEETS_CSV_URL = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vSjNkmixSEVnGu3Fkgpnu-qr2a4jVCzqlByBME7Hh08uqViJYFgxbziU8xjEsEe6KvDoACADL5RYvDW/pub?output=csv';

function ambilDataAspirasi() {
    Papa.parse(GOOGLE_SHEETS_CSV_URL, {
        download: true,
        header: true,
        complete: function(results) {
            const dataAspirasi = results.data;
            tampilkanKeUI(dataAspirasi);
        },
        error: function(error) {
            console.error("Gagal memuat data dari Google Sheets:", error);
        }
    });
}

function tampilkanKeUI(daftarAspirasi) {
    // Target container HTML
    const wadahDirektorat = document.getElementById('direktorat-container');
    const wadahFarmasi = document.getElementById('farmasi-container');
    const wadahKesling = document.getElementById('kesling-container');
    const wadahTEM = document.getElementById('tem-container');
    const wadahTRO = document.getElementById('tro-container');
    const wadahGizi = document.getElementById('gizi-container');
    const wadahAnfar = document.getElementById('anfar-container');
    const wadahTG = document.getElementById('tg-container');

    // Loading text
    if(wadahDirektorat) wadahDirektorat.innerHTML = '';
    if(wadahFarmasi) wadahFarmasi.innerHTML = '';
    if(wadahKesling) wadahKesling.innerHTML = '';
    if(wadahTEM) wadahTEM.innerHTML = '';
    if(wadahTRO) wadahTRO.innerHTML = '';
    if(wadahGizi) wadahGizi.innerHTML = '';
    if(wadahAnfar) wadahAnfar.innerHTML = '';
    if(wadahTG) wadahTG.innerHTML = '';

    // Variabel hitungan awal statistik
    let totalDiterima = 0;
    let totalDiproses = 0;
    let totalSelesai = 0;
    let totalDitangguhkan = 0;

    daftarAspirasi.forEach(item => {
        if (!item.jurusan || !item.judul || !item.status) return;

        const statusBersih = item.status.toLowerCase().trim();

        if (statusBersih === 'diterima') totalDiterima++;
        if (statusBersih === 'diproses') totalDiproses++;
        if (statusBersih === 'selesai') totalSelesai++;
        if (statusBersih === 'ditangguhkan') totalDitangguhkan++;

        let badgeStyle = 'bg-slate-100 text-slate-800'; 
        if (statusBersih === 'diterima') badgeStyle = 'bg-blue-100 text-blue-800 border border-blue-200';
        if (statusBersih === 'diproses') badgeStyle = 'bg-amber-100 text-amber-800 border border-amber-200';
        if (statusBersih === 'selesai') badgeStyle = 'bg-emerald-100 text-emerald-800 border border-emerald-200';
        if (statusBersih === 'ditangguhkan') badgeStyle = 'bg-rose-100 text-rose-800 border border-rose-200';

        const card = document.createElement('div');
      
        card.className = 'flex-1 min-w-[280px] max-w-[340px] bg-slate-50 border border-slate-200 rounded-xl p-4 flex flex-col justify-between shadow-sm hover:border-slate-300 transition-all duration-200';
        card.innerHTML = `
            <div>
                <h4 class="font-bold text-slate-800 text-base mb-1 line-clamp-2">${item.judul}</h4>
                <p class="text-slate-600 text-xs leading-relaxed mb-4">${item.deskripsi}</p>
            </div>
            <div class="flex items-center justify-between pt-2 border-t border-slate-200/60 mt-auto">
                <span class="text-[10px] uppercase font-extrabold px-2.5 py-0.5 rounded-full ${badgeStyle}">
                    ${item.status.toUpperCase()}
                </span>
            </div>
        `;

        // Filter sistem berdasarkan kolom jurusan
        const cekKategori = item.jurusan.toLowerCase().trim();

        if (cekKategori === 'direktorat') {
            wadahDirektorat.appendChild(card);
        } else if (cekKategori === 'farmasi') {
            wadahFarmasi.appendChild(card);
        } else if (cekKategori === 'kesling') {
            wadahKesling.appendChild(card);
        } else if (cekKategori === 'tem') {
            wadahTEM.appendChild(card);
        } else if (cekKategori === 'tro') {
            wadahTRO.appendChild(card);
        } else if (cekKategori === 'gizi') {
            wadahGizi.appendChild(card);
        } else if (cekKategori === 'anfar') {
            wadahAnfar.appendChild(card);
        } else if (cekKategori === 'tg') {
            wadahTG.appendChild(card);
        }
    });

    // hasil statistik
    if (document.getElementById('stat-diterima')) document.getElementById('stat-diterima').innerText = totalDiterima;
    if (document.getElementById('stat-diproses')) document.getElementById('stat-diproses').innerText = totalDiproses;
    if (document.getElementById('stat-selesai')) document.getElementById('stat-selesai').innerText = totalSelesai;
    if (document.getElementById('stat-ditangguhkan')) document.getElementById('stat-ditangguhkan').innerText = totalDitangguhkan;
}

ambilDataAspirasi();