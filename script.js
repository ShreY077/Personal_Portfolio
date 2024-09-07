function revealtoSpan() {
    document.querySelectorAll(".reveal").forEach(function(elem) {
        var parent = document.createElement("span");
        var child = document.createElement("span");

        parent.classList.add("parent");
        child.classList.add("child");
        
        child.innerHTML = elem.innerHTML;
        parent.appendChild(child);

        elem.innerHTML = "";
        elem.appendChild(parent);
    });
}

function valueSetter() {
    gsap.set("#nav a", { y: "-100%", opacity: 0 });
    gsap.set("#home .parent .child", { y: "100%" });
    gsap.set("#home .image img", { opacity: 0 });
}

function mousefollower() {
    var main = document.querySelector("#main");
    var cursor = document.querySelector("#m-cursor");

    main.addEventListener("mousemove", function(dets){
        gsap.to(cursor,{
            x:dets.x,
            y:dets.y
        })
    })
}

function dropdownHoverEffect() {
    document.querySelectorAll('.has-dropdown').forEach(function(parentItem) {
        const dropdown = parentItem.querySelector('.dropdown');

        parentItem.addEventListener('mouseenter', function() {
            dropdown.style.maxHeight = dropdown.scrollHeight + 'px'; // Expand dropdown
            dropdown.style.opacity = '1'; // Fade in
            dropdown.style.visibility = 'visible'; // Make it visible
        });

        parentItem.addEventListener('mouseleave', function() {
            dropdown.style.maxHeight = '0'; // Collapse dropdown
            dropdown.style.opacity = '0'; // Fade out
            dropdown.style.visibility = 'hidden'; // Hide from view
        });
    });
}

function loaderAnimation() {
    var tl = gsap.timeline();

    tl.from("#loader .child span", {
        opacity: 0,
        y: 50,
        delay: 0.3,
        scale: 0.95,
        stagger: 0.3,
        duration: .9,
        ease: "Expo.easeInOut"
    })
    .to("#loader .parent .child", {
        y: "-100%",
        duration: 1.5,
        delay: 1.2,
        ease: "Expo.easeInOut"
    })
    .to("#loader", {
        height: 0,
        duration: 1,
        ease: "Power4.inOut",
        onComplete: function() {
            document.body.style.overflow = 'auto';
        }
    }, "-=0.5")
    .to("#green", {
        height: "100%",
        top: 0,
        duration: 1,
        ease: "Circ.easeInOut"
    }, "-=0.72")
    .to("#green", {
        height: 0,
        delay: -0.4,
        duration: 1,
        ease: "Circ.easeInOut",
        onComplete: function() {
            animateHomepage();
        }
    });
}

function animateHomepage() {
    var tl = gsap.timeline();

    tl.to("#nav a", {
        y: 0,
        opacity: 1,
        stagger: 0.15,
        ease: "Expo.easeInOut"
    })

    .to("#home .parent .child", {
        y:0,
        stagger:.75,
        duration:2,
        ease:"Expo.easeInOut"
    })

    .to("#home .image img", {
        y:0,
        opacity:1,
        duration:.8,
        ease:"Expo.easeInOut"
    })
}

function animateSvg() {
    document.querySelectorAll("svg > g#Web path, svg > g#Web polyline").forEach(function(character) {
        var length = character.getTotalLength();
        
        character.style.strokeDasharray = length + 'px';
        character.style.strokeDashoffset = length + 'px';
        character.style.fill = 'none'; // Set fill to none initially
    });

    gsap.timeline()
        .to("svg > g#Web path, svg > g#Web polyline", {
            strokeDashoffset: 0,
            duration: 8.5,
            ease: "Power3.inOut",
            delay: 9,
            stagger: 0.9,
            onUpdate: function() {
                // Make the fill gradually visible as the stroke animation progresses
                document.querySelectorAll("svg > g#Web path, svg > g#Web polyline").forEach(function(character) {
                    var length = character.getTotalLength();
                    var dashOffset = gsap.getProperty(character, "strokeDashoffset");
                    if (dashOffset <= length * 0.80) { // Adjust this value for the timing of fill appearance
                        character.style.fill = '#14cf93';
                    }
                });
            },
            onComplete: function() {
                document.querySelectorAll("svg > g#Web path, svg > g#Web polyline").forEach(function(character) {
                    character.style.fill = '#14cf93'; // Ensure fill is set to final color at the end
                });
            }
        });
}

function AboutScroll(){
    var tl = gsap.timeline({scrollTrigger:{
        trigger:"#me",
        // markers:true,
        start:"50% 50%",
        end:"150% 50%",
        scrub:2, 
        pin:true
    }});
    
    tl
    
    .to("#top",{
        top:"-50%",
        duration:2
    },'a')
    
    .to("#bottom",{
        bottom:"-50%",
        duration:2
    },'a')
    
    .to("#top-h",{
        bottom:"-70%",
        duration:3
    },'a')
    
    .to("#bottom-h",{
        top: "-70%",
        duration:3
    },'a')
    
    .to(".content",{
        marginTop: "0%",
        duration: 2,
        stagger:.5,
        ease:"power4.inOut"
    },'a')

    .to(".text-area-hover",{
        width:"100%",
        duration:4,
        ease:"power6.inOut",
        delay:-1.8
    })

    .to("#top-h",{
        bottom:"-0%",
        duration:3
    },'b')
    
    .to("#bottom-h",{
        top: "-0%",
        duration:3
    },'b')
    
    .to("#top",{
        top:"0%",
        duration:2
    },'b')
    
    .to("#bottom",{
        bottom:"0%",
        duration:2
    },'b')

    
}

function skillScroll(){
    tl = gsap.timeline({scrollTrigger:{
        trigger:".skill-container",
        // markers:true,
        start:"20% 80%",
        end:"120% 70%",
        scrub:1,
        delay:-1
   }});
   
   tl 
    .to(".iconLeft",{
       x:"-150px",
       opacity:1
    },'a')
   
    .to(".iconRight",{
       x:"150px",
       opacity:1
    },'a')
}

function cardHoverEffect() {
    document.querySelectorAll(".imgContainer")
    .forEach(function(imgContainer) {
        var showingImage;

        imgContainer.addEventListener("mousemove", function(dets) {
            var cursor = document.querySelector("#cursor");
            var index = dets.target.dataset.index;

            if (index !== undefined) {
                cursor.children[index].style.opacity = 1;
                cursor.children[index].style.transform = `translate(${dets.clientX}px, ${dets.clientY}px)`;
                showingImage = dets.target;
                showingImage.style.filter = "grayscale(1)";
                
                document.querySelector("#projects").style.backgroundColor = "#" + dets.target.dataset.color;
            }
        });

        imgContainer.addEventListener("mouseleave", function() {
            if (showingImage && showingImage.dataset.index !== undefined) {
                var index = showingImage.dataset.index;
                var cursor = document.querySelector("#cursor");

                cursor.children[index].style.opacity = 0;
                showingImage.style.filter = "grayscale(0)";
                document.querySelector("#projects").style.backgroundColor = "#f2f2f2";
            }
        });
    });
}



function showSidebar() {
    const sidebar = document.getElementById('sidebar')
    sidebar.style.display = 'flex'
}

function hideSidebar() {
    const sidebar = document.getElementById('sidebar')
    sidebar.style.display = 'none'
}

function handleScroll() {
    const button = document.getElementById("s-btn-open");
    const scrollThreshold = 280; // Amount of scroll needed to show the button (adjust as needed)

    if (window.scrollY > scrollThreshold) {
        button.classList.add("visible");
    } else {
        button.classList.remove("visible");
    }
}

var tl = gsap.timeline({
    scrollTrigger: {
        trigger: "h2.show-up",
        start: "120% 20%",    
        end: "200% -20%",     
        scrub: 1,             
        pin: false,           
        // markers: true         
    }
});

tl.fromTo(".line-parent .line-child", {
    y: 100,           
    opacity: 0       
}, {
    y: 0,            
    opacity: 1,      
    duration: 4,     
    stagger: 0.5     
}, 'start');

//  // Initialize Lenis
const lenis = new Lenis({
    duration: 1.5, // Adjust duration as needed
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Default easing function
    smooth: true
});


// // Animation frame function for Lenis
function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
}



requestAnimationFrame(raf);
revealtoSpan();
valueSetter();
loaderAnimation();
animateSvg();
AboutScroll();
skillScroll();
cardHoverEffect();
dropdownHoverEffect();
mousefollower();
window.addEventListener("scroll", handleScroll);