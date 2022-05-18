const productList = [
    {id: 1, product_name: 'Sony Headphone', price: 200, desc: 'Bose QuietComfort 35 II Noise Cancelling Bluetooth Headphones— Wireless, Over Ear Headphones with Built in Microphone and Alexa Voice Control, Silver'},
    {id: 2, product_name: 'Nike shoe', price: 500, desc: 'The iconic Nike Air Zoom Pegasus 36 is updated with multiple perforated inserts and engineered mesh on the upper for strategic breathability in the warmer spots. The slimmer tongue and collar portion at the heel reduces clutter without compromising comfort, while exposed Flywire cables ensure a comfortable fit when the speed rises.'},
    {id: 3, product_name: 'Dell Laptop', price: 900, desc: 'Dell XPS 13 7390 2-in-1 is engineered with: 10th Generation Intel Core i7-1065G7 (8 MB Cache, up to 3.90 GHz), 13.4-inch (1920 x 1200) 16:10 FHD+ WLED Touch Display, 8GB 3733MHz LPDDR4x , 256 GB [PCIe] NVMe x4 (SSD) Onboard, Intel Iris Plus Graphics, Platinum Silver, Arctic White interior'},
       
]

exports.getProduct = (req,res) => {
    res.render('product', {
        products: productList, pageTitle: "Product Page"
    })
}

