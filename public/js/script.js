const navLinks = {
    characters: document.getElementById('nav-characters'),
    weapons: document.getElementById('nav-weapons'),
    artifacts: document.getElementById('nav-artifacts')
  };
  
  const contentData = document.getElementById('content-data');
  const heading = document.getElementById('heading');
  
  const data = {
    characters: `<h1 class="bg-teal-500">hello world</h1>
      <input type="text" name="name">
      <button class="btn">send</button>`,
    weapons: 'weapons div',
    artifacts: 'artifacts div'
  };
  
  function showContent(item) {
    contentData.innerHTML = data[item];
  }
  
  function handleNavClick(item, link) {
    showContent(item);
    heading.innerHTML = link.innerHTML;
  
    for (const navLink of Object.values(navLinks)) {
      navLink.classList.remove('light-gray');
    }
    navLinks[item].classList.add('light-gray');
  }
  
  for (const [item, navLink] of Object.entries(navLinks)) {
    navLink.addEventListener('click', () => {
      handleNavClick(item, navLink);
    });
  }
  
  // Initial content display
  showContent('characters');
  heading.innerHTML = navLinks.characters.innerHTML;
  navLinks.characters.classList.add('light-gray');
  