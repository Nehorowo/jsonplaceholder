async function getResponses() {
  let usersResponse = await fetch('http://jsonplaceholder.typicode.com/users');
  let usersContent = await usersResponse.json();
  usersContent = usersContent.splice(0, 10);

  let postsResponse = await fetch('http://jsonplaceholder.typicode.com/posts');
  let postsContent = await postsResponse.json();

  //for in
  for (key in usersContent) {
      //posts
      const filteredPosts = postsContent.filter((post)=>post.userId == usersContent[key].id);
      usersContent[key].posts = filteredPosts;
      
      //title crop
      usersContent[key].posts.forEach((post)=>{
        post.title_crop = post.title.slice(0,20) + '...';
        delete post.userId;
      })

      //website
      usersContent[key].website = 'https://' + usersContent[key].website;

      //address
      const addressValues = Object.values(usersContent[key].address);
      const [city, street, suite] = addressValues;
      usersContent[key].address = [city, street, suite].join(', ');

      //company => field 'name'
      const [name] = Object.values(usersContent[key].company);
      usersContent[key].company = name;
      
      //deleting phone and username
      delete usersContent[key].phone;
      delete usersContent[key].username;


      console.log(usersContent[key]);
  }
  
}

getResponses();