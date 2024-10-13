// Array untuk menyimpan pelanggan sementara
let customers = [];

// Fungsi untuk menghitung total pembayaran berdasarkan penggunaan air
function calculateTotalAdmin() {
    const waterUsage = document.getElementById('water-usage-admin').value;
    const pricePerCubicMeter = 5000;
    const totalPayment = waterUsage * pricePerCubicMeter;
    document.getElementById('total-payment-admin').innerText = totalPayment.toLocaleString('id-ID');
}

// Tambahkan event listener untuk menghitung pembayaran saat jumlah pemakaian diinput
document.getElementById('water-usage-admin').addEventListener('input', calculateTotalAdmin);

// Fungsi untuk menyimpan tagihan pelanggan
function saveBill() {
    const customerId = document.getElementById('customer-id-admin').value;
    const customerName = document.getElementById('customer-name-admin').value;
    const customerAddress = document.getElementById('customer-address-admin').value;
    const waterUsage = document.getElementById('water-usage-admin').value;
    

    if (!customerId.trim() || !customerName.trim() || !customerAddress.trim() || !waterUsage) {
        alert("Mohon isi semua kolom dengan benar.");
        return;
    }

    const totalPayment = waterUsage * 5000;

    // Simpan data pelanggan ke array customers
    const newCustomer = {
        id: customerId,
        name: customerName,
        address: customerAddress,
        waterUsage: waterUsage,
        totalBill: totalPayment
    };
    
    customers.push(newCustomer);

    // Simpan data pelanggan ke localStorage
    localStorage.setItem('customers', JSON.stringify(customers));

    // Reset status pembayaran di localStorage
    localStorage.setItem(`bill_paid_${customerId}`, false);

    // Reset form
    document.getElementById('customer-id-admin').value = '';
    document.getElementById('customer-name-admin').value = '';
    document.getElementById('customer-address-admin').value = '';
    document.getElementById('water-usage-admin').value = '';
    document.getElementById('total-payment-admin').innerText = '0';

    // Update tampilan daftar pelanggan
    updateCustomerList();
}

// Fungsi untuk menampilkan daftar pelanggan di UI
function updateCustomerList() {
    const customerList = document.getElementById('customer-list-ul');
    customerList.innerHTML = ''; // Kosongkan daftar sebelum diperbarui
    
    customers.forEach((customer, index) => {
        const listItem = document.createElement('li');
        listItem.textContent = `${index + 1}. Nomor Pelanggan: ${customer.id}, Nama: ${customer.name}, Alamat: ${customer.address}, Penggunaan Air: ${customer.waterUsage} m³, Total Tagihan: Rp ${customer.totalBill.toLocaleString('id-ID')}`;
        customerList.appendChild(listItem);
    });
}
