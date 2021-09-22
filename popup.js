// Initialize butotn with users's prefered color
let groupButton = document.getElementById("groupIt");

groupButton.addEventListener("click", async() => getDomainIterator());

async function getDomainIterator() {
  try {
    var tabs = await chrome.tabs.query({ });

    const domain_map = new Map();
    // console.log(tabs);
    for (tab of tabs) {
      // console.log(tab);
      // console.log(tab.url);
      var url = new URL(tab.url);
      var domain = url.hostname;
      var tab_list = [];
      if (domain_map.has(domain)) {
        tab_list = domain_map.get(domain);
        tab_list.push(tab.id);
        domain_map.set(domain, tab_list);
      } else {
        tab_list.push(tab.id);
        domain_map.set(domain, tab_list);
      }
    }

    var domain_iterator = domain_map[Symbol.iterator]();

    for (domain_list of domain_iterator) {
      // console.log(domain_list);
      var tab_group = await chrome.tabs.group({tabIds:domain_list[1]});
      var group_udpate = await chrome.tabGroups.update(tab_group, {title : domain_list[0], collapsed : true});
      console.log(group_udpate);
    }
  } catch (error) {
    console.log(error);
  }
}