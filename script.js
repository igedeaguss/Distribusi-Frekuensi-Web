
function cekinput(){
    const inputan = document.getElementById('inputan').value.trim();
    
   
    if (inputan.endsWith(',')) {
      // Menampilkan alert jika input diakhiri dengan koma
      document.getElementById('teksError').innerText = 'Data tidak boleh diakhiri dengan koma (,)';
      $('#pesanErrorModal').modal('show');
      //alert('Data tidak boleh diakhiri dengan koma (,)'); 
    } else if(inputan === ""){
      document.getElementById('teksError').innerText = 'Form tidak boleh kosong!';
      $('#pesanErrorModal').modal('show');
    }else {
        hitungArray(); // Memanggil fungsi hitungArray jika input valid
    }
}

function hitungArray() {
    // Mengambil nilai dari input
    const input = document.getElementById('inputan').value;
  
    // Memisahkan nilai berdasarkan koma dan mengonversinya menjadi array
    const arrayHasil = input.split(',').map(Number);

    const maxData = Math.max(...arrayHasil);
    const minData = Math.min(...arrayHasil);
    const jangkauan = maxData - minData;

    // Menghitung kelas
    const jumlahData = arrayHasil.length;
    const kelas = 1 + 3.3 * Math.log10(jumlahData);

    // Menghitung interval
    const interval = jangkauan / Math.round(kelas);

    const batas_data = [];

    let hasil = (minData + Math.round(interval)) -1 ;
    batas_data.push([minData, hasil]);
    hasil = hasil + 1;

    for (let i = 1; i < Math.round(kelas); i++) {
        batas_data.push([hasil, (hasil + Math.round(interval) - 1)]);
        hasil = (hasil + Math.round(interval) - 1) + 1;
      }

      let banyak = 0;
      let frekuensi = [];
      
      for (let k = 0; k < batas_data.length; k++) {
          for (let l = 0; l < arrayHasil.length; l++) {
              if (arrayHasil[l] >= batas_data[k][0] && arrayHasil[l] <= batas_data[k][1]) {
                  banyak += 1;
                }
            }
            frekuensi.push(banyak);
            banyak = 0;
        }

    let tabelInterval = document.getElementById('tabel tampil');

    for (let j = 0; j < batas_data.length; j++) {
      let newRow = tabelInterval.insertRow(tabelInterval.rows.length);
      let kelasCell = newRow.insertCell(0);
      let intervalCell = newRow.insertCell(1);
    
      kelasCell.innerHTML = `${batas_data[j][0]} - ${batas_data[j][1]}`;
      intervalCell.innerHTML = frekuensi[j];
    }

    const total = arrayHasil.reduce((acc, curr) => acc + curr, 0);
    const rataRata = total / arrayHasil.length;

    arrayHasil.sort((a, b) => a - b);

    const n = arrayHasil.length;
    if (n % 2 === 1) {
        // Jumlah data ganjil
        median = arrayHasil[Math.floor(n / 2)];
    } else {
        // Jumlah data genap
        const mid1 = arrayHasil[n / 2 - 1];
        const mid2 = arrayHasil[n / 2];
        median = (mid1 + mid2) / 2;
    }

    const mds = {};
    arrayHasil.forEach((nilai) => {
        if (!mds[nilai]) {
            mds[nilai] = 1;
        } else {
            mds[nilai]++;
        }
    });

    let modus;
    let maxFrekuensi = 0;
    for (const nilai in mds) {
        if (mds[nilai] > maxFrekuensi) {
            modus = nilai;
            maxFrekuensi = mds[nilai];
        }
    }

    // Tampilkan nilai rata-rata
    nilaiRataRata.innerText = rataRata.toFixed(2); // Menampilkan hingga 2 angka di belakang koma
    nilaiRataRataText.style.display = 'block'; // Menampilkan hasil rata-rata setelah dihitung
    
    // Tampilkan nilai jangkauan
    nilaijangkauan.innerText = jangkauan; // Menampilkan hingga 2 angka di belakang koma
    nilaiJangkauansText.style.display = 'block'; // Menampilkan nilai jangkauan
    
    // Tampilkan nilai interval
    nilaiinterval.innerText =`${interval.toFixed(2)} -> ${Math.round(interval)}`; // Menampilkan hingga 2 angka di belakang koma
    nilaiIntervalText.style.display = 'block'; // Menampilkan nilai jangkauan

    // Tampilkan nilai kelas
    nilaikelas.innerText =`${kelas.toFixed(2)} -> ${Math.round(kelas)}`; // Menampilkan hingga 2 angka di belakang koma
    nilaiKelasText.style.display = 'block'; // Menampilkan nilai jangkauan
    
    // Tampilkan nilai median 
    nilaimedian.innerText = median; // Menampilkan hingga 2 angka di belakang koma
    nilaimedianText.style.display = 'block'; // Menampilkan nilai median

    // Tampilkan nilai modus
    nilaimodus.innerText = modus; // Menampilkan hingga 2 angka di belakang koma
    nilaimodusText.style.display = 'block'; // Menampilkan nilai median
  }

function hapusData() {
    // Menghapus nilai inputan
    document.getElementById('inputan').value = '';
    nilaimodus.style.display = 'none';
    nilaiRataRata.style.display = 'none';
    nilaimedian.style.display = 'none';
    nilaijangkauan.style.display = 'none';
    nilaikelas.style.display = 'none';
    nilaiinterval.style.display = 'none';
  
    // Menghapus nilai tabel kecuali baris header
    let tabelInterval = document.getElementById('tabel tampil');
    let rowCount = tabelInterval.rows.length;
  
    for (let i = rowCount - 1; i > -1; i--) {
      let row = tabelInterval.rows[i];
      if (row.cells[0].innerHTML !== 'Interval') {
        tabelInterval.deleteRow(i);
      }
    }
  }

  function muatulang(){
    location.reload();
  }