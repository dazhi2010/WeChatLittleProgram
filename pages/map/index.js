const util = require('../../utils/util.js');
var thisPage;
var peoples;
Page({
	data: {
		// markers: [{
		// 	iconPath: "/images/location.png",
		// 	id: 0,
		// 	latitude: 23.099994,
		// 	longitude: 113.324520,
		// 	width: 50,
		// 	height: 50
		// }],
		polyline: [{
			points: [{
				longitude: 113.3245211,
				latitude: 23.10229
			}, {
				longitude: 113.324520,
				latitude: 23.21229
			}],
			color: "#FF0000DD",
			width: 2,
			dottedLine: true
		}],
		controls: [{
			id: 1,
			iconPath: '/images/others.png',
			position: {
				left: 0,
				bottom: 0,
				width: 50,
				height: 50
			},
			clickable: true
		}]
	},
	regionchange(e) {
		console.log(e.type)
	},
	markertap(e) {
		console.log(e.markerId)
		for(var i in peoples){
			if(peoples[i].callLetter==e.markerId){
				thisPage.setData({selectedPeople:peoples[i]});
				return;
			}
		}
	},
	controltap(e) {
		if(e.controlId==1){
			wx.scanCode({
				onlyFromCamera: true,
				success: (res) => {
					console.log(res)
				}
			})
		}
	},
	clickdaohang: function (event) {
		wx.openLocation({
			longitude: event.currentTarget.dataset.longitude,
			latitude: event.currentTarget.dataset.latitude,
			name: event.currentTarget.dataset.name,
			scale: 16
		})
	},
	onLoad() {
		thisPage = this;
		util.easyRequest('api/gps/lastposition2',
			{
				"callLetter": ["1ee7b970937111e7977f5254002c2645", "e6028b34a6035a47a8b34e7d84621476", "719d2d01-cc31-4bbb-add6-818d6889ce29", "0185b049938511e7977f5254002c2645", "971ece65f41b5fd1a54a180d33aa3c1c", "3699d83e937111e7977f5254002c2645", "4161c9ae-a51e-4219-a6d4-e27fb398a5ed", "2c59b833b4895e9e82a9cf0fcc8389ba", "78681dcf671d56ea9d8509f8426fab3b", "96ae7fef937111e7977f5254002c2645", "56314ce6-335f-4626-975e-ef50c5763bb5", "be3288d3937111e7977f5254002c2645", "eea0c0cd-06b4-4666-94f4-dac64361047e", "a0097607309758aab3b50dfe9f257f47", "971ece65f41b5fd1a54a180d33aa3c1c", "bf7c6f03-ebec-4f25-9fa0-ddcde11c2321", "d8dcbcf9937111e7977f5254002c2645", "587d70b4c85e5e1cbfd97e5d878982d5", "6c0a45de-d800-40e3-851c-d8411616030a", "fbb5d17b937111e7977f5254002c2645", "06d22e37-6077-4316-b91a-eefca5d15b5a", "d663a8c88a0d5a23a5145904c86f989e", "306e7e11937211e7977f5254002c2645"],
				"gridNum": null
			},
			function (data) {
				peoples = data.data;
				var markers = [];
				for (var i in peoples) {
					var p = peoples[i];
					markers.push({
						iconPath: "/images/location.png",
						id: p.callLetter,
						latitude: p.Y,
						longitude: p.X,
						width: 50,
						height: 50,
						callout: {
							content:p.uName+"\n"+p.gridName+"\n"+p.tel,
							bgColor:"#d68fff",
							display:"BYCLICK"
						}
					});
				}
				thisPage.setData({markers: markers});
			});
	}
})