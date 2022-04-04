
function tsukamotoFunc(){
    let umur = document.getElementById("umur").value;
    let berat = document.getElementById("berat").value;
    let intensitas = document.getElementById("intensitas").value;
    let A = new Array(27);
    let z = new Array(27);
    let u = new Array(27);
    let b = new Array(27);
    let o = new Array(27);

    // $('#keputusan').val(keputusanJmlAir()+" ml (mili liter)");	

    // Fuzifikasi untuk mendapatkan nilai keanggotaan masing - masing himpunan

    // Kelompok Umur
    // Anak
    function getKelompokUmurAnak(){
        if(umur <= 4){
            return 1;
        }
        else if(umur > 4  && umur <= 16){
            return (16 - umur)/(16 - 4);
        }
        else if(umur >= 16){
            return 0;
        }
    }
    // Dewasa
    function getKelompokUmurDewasa(){
        if(umur <= 15 || umur >= 55){
            return 0;
        }
        else if(umur > 15 && umur <= 35){
            return (umur - 15) / (35 - 15);
        }
        else if(umur > 35 && umur <= 55){
            return (55 - umur) / (55 - 35);
        }
    }
    // Lansia
    function getKelompokUmurLansia(){
        if(umur <= 52){
            return 0;
        }
        else if(umur > 52 && umur < 55){
            return (umur - 52) / (55 - 52);
        }
        else if(umur >= 55){
            return 1;
        }
    }

    // Berat Badan
    // Ringan
    function getBeratBadanRingan(){
        if(berat <= 20){
            return 1;
        }
        else if(berat > 20 && berat < 57){
            return (57 - berat) / (57 - 20);
        }
        else if(berat >= 57){
            return 0;
        }
    }
    // Normal
    function getBeratBadanNormal(){
        if(berat <= 52 || berat >= 74){
            return 0;
        }
        else if(berat > 52 && berat <= 63){
            return (berat - 52) / (63 - 52);
        }
        else if(berat > 63 && berat < 74){
            return (74 - berat) / (74 - 63);
        }
    }
    // Berat
    function getBeratBadanBerat(){
        if(berat <= 70){
            return 0;
        }
        else if(berat > 70 && berat < 74){
            return (berat - 70) / (74 - 70);
        }
        else if(berat >= 74){
            return 1;
        }
    }
    
    // Intensitas Olahraga
    // Ringan    
    function getIntensitasOlahragaRingan(){
        if(intensitas <= 10){
            return 1;
        }
        else if(intensitas > 10 && intensitas < 40){
            return (40 - intensitas) / (40 - 10);
        }
        else if(intensitas >= 40){
            return 0;
        }
    }
    // Sedang
    function getIntensitasOlahragaSedang(){
        if(intensitas <= 30 || intensitas >= 60){
            return 0;
        }
        else if(intensitas > 30 && intensitas <= 45){
            return (intensitas - 30) / (45 - 30);
        }
        else if(intensitas > 45 && intensitas < 60){
            return (60 - intensitas) / (60 - 45);
        }
    }
    // Tinggi
    function getIntensitasOlahragaTinggi(){
        if(intensitas <= 45){
            return 0;
        }
        else if(intensitas > 45 && intensitas < 60){
            return (intensitas - 45) / (60 - 45);
        }
        else if(intensitas >= 60){
            return 1;
        }
    }
    // Keputusan Jumlah Kebutuhan Air
    // Sedikit
    function zJmlAirSedikit(A){
        if(A > 0 && A < 1){
            return(1900 - A * 1100);
        }
        else if(A == 1){
            return 800;
        }
        else{
            return 1900;
        }
    }
    // Sedang
    function zJmlAirSedang(A){
        if(A > 0 && A < 1){
            return(A * 850 + 2350);
        }
        else if(A == 1){
            return 2350;
        }
        else{
            return 1500;
        }
    }
    // Banyak
    function zJmlAirBanyak(A){
        if(A > 0 && A < 1){
            return(A * 1600 + 2700);
        }
        else if(A == 1){
            return 4300;
        }
        else{
            return 2700;
        }
    }
    
    // menentukan nilai minimum untuk mencari nilai A (alpha) 
    function aMin(a, b, c){
		if(a <= b && a <= c){
			return a;
		}
        else if(b <= a && b <= c){
			return b;
		}
        else if(c <= a && c <=b){
			return c;
		}
	}

    // Menentukan alpha untuk mencari nilai z tiap rules 
    function fuzzyRules(){
    // Anak	Ringan	Ringan	Sedikit
        u[0] = getKelompokUmurAnak();
        b[0] = getBeratBadanRingan();
        o[0] = getIntensitasOlahragaRingan();
        A[0] = aMin(u[0], b[0], o[0]);
        z[0] = zJmlAirSedikit(A[0]);
    // Anak	Ringan	Sedang	Sedikit
        u[1] = getKelompokUmurAnak();
        b[1] = getBeratBadanRingan();
        o[1] = getIntensitasOlahragaSedang();
        A[1] = aMin(u[1], b[1], o[1]);
        z[1] = zJmlAirSedikit(A[1]);
    // Anak	Ringan	Tinggi	Sedang
        u[2] = getKelompokUmurAnak();
        b[2] = getBeratBadanRingan();
        o[2] = getIntensitasOlahragaTinggi();
        A[2] = aMin(u[2], b[2], o[2]);
        z[2] = zJmlAirSedang(A[2]);
    // Anak	Normal	Ringan	Sedikit
        u[3] = getKelompokUmurAnak();
        b[3] = getBeratBadanNormal();
        o[3] = getIntensitasOlahragaRingan();
        A[3] = aMin(u[3], b[3], o[3]);
        z[3] = zJmlAirSedikit(A[3]);
    // Anak	Normal	Sedang	Sedang
        u[4] = getKelompokUmurAnak();
        b[4] = getBeratBadanNormal();
        o[4] = getIntensitasOlahragaSedang();
        A[4] = aMin(u[4], b[4], o[4]);
        z[4] = zJmlAirSedang(A[4]);
    // Anak	Normal	Tinggi	Banyak
        u[5] = getKelompokUmurAnak();
        b[5] = getBeratBadanNormal();
        o[5] = getIntensitasOlahragaTinggi();
        A[5] = aMin(u[5], b[5], o[5]);
        z[5] = zJmlAirBanyak(A[5]);
    // Anak	Berat	Ringan	Sedang
        u[6] = getKelompokUmurAnak();
        b[6] = getBeratBadanBerat();
        o[6] = getIntensitasOlahragaRingan();
        A[6] = aMin(u[6], b[6], o[6]);
        z[6] = zJmlAirSedang(A[6]);
    // Anak	Berat	Sedang	Banyak
        u[7] = getKelompokUmurAnak();
        b[7] = getBeratBadanBerat();
        o[7] = getIntensitasOlahragaSedang();
        A[7] = aMin(u[7], b[7], o[7]);
        z[7] = zJmlAirBanyak(A[7]);
    // Anak	Berat	Tinggi	Banyak
        u[8] = getKelompokUmurAnak();
        b[8] = getBeratBadanBerat();
        o[8] = getIntensitasOlahragaTinggi();
        A[8] = aMin(u[8], b[8], o[8]);
        z[8] = zJmlAirBanyak(A[8]);
    // Dewasa	Ringan	Ringan	Sedikit
        u[9] = getKelompokUmurDewasa();
        b[9] = getBeratBadanRingan();
        o[9] = getIntensitasOlahragaRingan();
        A[9] = aMin(u[9], b[9], o[9]);
        z[9] = zJmlAirSedikit(A[9]);
    // Dewasa	Ringan	Sedang	Sedang
        u[10] = getKelompokUmurDewasa();
        b[10] = getBeratBadanRingan();
        o[10] = getIntensitasOlahragaSedang();
        A[10] = aMin(u[10], b[10], o[10]);
        z[10] = zJmlAirSedang(A[10]);
    // Dewasa	Ringan	Tinggi	Banyak
        u[11] = getKelompokUmurDewasa();
        b[11] = getBeratBadanRingan();
        o[11] = getIntensitasOlahragaTinggi();
        A[11] = aMin(u[11], b[11], o[11]);
        z[11] = zJmlAirBanyak(A[11]);
    // Dewasa	Normal	Ringan	Sedang
        u[12] = getKelompokUmurDewasa();
        b[12] = getBeratBadanNormal();
        o[12] = getIntensitasOlahragaRingan();
        A[12] = aMin(u[12], b[12], o[12]);
        z[12] = zJmlAirSedang(A[12]);
    // Dewasa	Normal	Sedang	Sedang
        u[13] = getKelompokUmurDewasa();
        b[13] = getBeratBadanNormal();
        o[13] = getIntensitasOlahragaSedang();
        A[13] = aMin(u[13], b[13], o[13]);
        z[13] = zJmlAirSedang(A[13]);
    // Dewasa	Normal	Tinggi	Banyak
        u[14] = getKelompokUmurDewasa();
        b[14] = getBeratBadanNormal();
        o[14] = getIntensitasOlahragaTinggi();
        A[14] = aMin(u[14], b[14], o[14]);
        z[14] = zJmlAirBanyak(A[14]);
    // Dewasa	Berat	Ringan	Banyak
        u[15] = getKelompokUmurDewasa();
        b[15] = getBeratBadanBerat();
        o[15] = getIntensitasOlahragaRingan();
        A[15] = aMin(u[15], b[15], o[15]);
        z[15] = zJmlAirBanyak(A[15]);
    // Dewasa	Berat	Sedang	Banyak
        u[16] = getKelompokUmurDewasa();
        b[16] = getBeratBadanBerat();
        o[16] = getIntensitasOlahragaSedang();
        A[16] = aMin(u[16], b[16], o[16]);
        z[16] = zJmlAirBanyak(A[16]);
    // Dewasa	Berat	Tinggi	Banyak
        u[17] = getKelompokUmurDewasa();
        b[17] = getBeratBadanBerat();
        o[17] = getIntensitasOlahragaTinggi();
        A[17] = aMin(u[17], b[17], o[17]);
        z[17] = zJmlAirBanyak(A[17]);
    // Lansia	Ringan	Ringan	Sedikit
        u[18] = getKelompokUmurLansia();
        b[18] = getBeratBadanRingan();
        o[18] = getIntensitasOlahragaRingan();
        A[18] = aMin(u[18], b[18], o[18]);
        z[18] = zJmlAirSedikit(A[18]);
    // Lansia	Ringan	Sedang	Banyak
        u[19] = getKelompokUmurLansia();
        b[19] = getBeratBadanRingan();
        o[19] = getIntensitasOlahragaSedang();
        A[19] = aMin(u[19], b[19], o[19]);
        z[19] = zJmlAirBanyak(A[19]);
    // Lansia	Ringan	Tinggi	Banyak
        u[20] = getKelompokUmurLansia();
        b[20] = getBeratBadanRingan();
        o[20] = getIntensitasOlahragaTinggi();
        A[20] = aMin(u[20], b[20], o[20]);
        z[20] = zJmlAirBanyak(A[20]);
    // Lansia	Normal	Ringan	Sedang
        u[21] = getKelompokUmurLansia();
        b[21] = getBeratBadanNormal();
        o[21] = getIntensitasOlahragaRingan();
        A[21] = aMin(u[21], b[21], o[21]);
        z[21] = zJmlAirSedang(A[21]);
    // Lansia	Normal	Sedang	Banyak
        u[22] = getKelompokUmurLansia();
        b[22] = getBeratBadanNormal();
        o[22] = getIntensitasOlahragaSedang();
        A[22] = aMin(u[22], b[22], o[22]);
        z[22] = zJmlAirBanyak(A[22]);
    // Lansia	Normal	Tinggi	Banyak
        u[23] = getKelompokUmurLansia();
        b[23] = getBeratBadanNormal();
        o[23] = getIntensitasOlahragaTinggi();
        A[23] = aMin(u[23], b[23], o[23]);
        z[23] = zJmlAirBanyak(A[23]);
    // Lansia	Berat	Ringan	Banyak
        u[24] = getKelompokUmurLansia();
        b[24] = getBeratBadanBerat();
        o[24] = getIntensitasOlahragaRingan();
        A[24] = aMin(u[24], b[24], o[24]);
        z[24] = zJmlAirBanyak(A[24]);
    // Lansia	Berat	Sedang	Banyak
        u[25] = getKelompokUmurLansia();
        b[25] = getBeratBadanBerat();
        o[25] = getIntensitasOlahragaSedang();
        A[25] = aMin(u[25], b[25], o[25]);
        z[25] = zJmlAirBanyak(A[25]);
    // Lansia	Berat	Tinggi	Banyak
        u[26] = getKelompokUmurLansia();
        b[26] = getBeratBadanBerat();
        o[26] = getIntensitasOlahragaTinggi();
        A[26] = aMin(u[26], b[26], o[26]);
        z[26] = zJmlAirBanyak(A[26]);
    }

    function deFuzifikasi(){
        let temp0 = 0;
        let temp1 = 0;
        let result;
        for(i = 0; i < A.length; i++){
            temp1 = temp1 + A[i] * z[i];
            temp0 = temp0 + A[i];
        }
        result = temp1/temp0;
        return result.toFixed(1);
    }
    
    function keputusanJmlAir(){
        fuzzyRules();
        return deFuzifikasi();
    }
    document.getElementById("keputusan").innerHTML = keputusanJmlAir()+" mililiter";

    let table_result = "";
    for(i = 0; i < A.length; i++){
        table_result += "<tr><td>"+(i+1)+"<td>"+u[i].toFixed(4)+"</td><td>"+b[i].toFixed(4)+"</td><td>"+o[i].toFixed(4)+"</td><td>"+A[i].toFixed(4)+"</td><td>"+z[i].toFixed(4)+"</td><td>"+(A[i]*z[i]).toFixed(4)+"</td><tr/>";
    }
    let total_A = 0;
    for(i = 0; i < A.length; i++){
        total_A = total_A + A[i];
    }
    let total_AZ = 0;
    for(i = 0; i < A.length; i++){
        total_AZ = total_AZ + (A[i]*z[i]);
    }
    document.getElementById("table_result").innerHTML = table_result ;
    document.getElementById("total-a").innerHTML = total_A.toFixed(4) ;
    document.getElementById("total-az").innerHTML = total_AZ.toFixed(4) ;
    document.getElementById("cek-total").innerHTML = keputusanJmlAir() ;


    
    
}
