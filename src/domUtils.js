   
import {maskItem,getStringTokensToMask} from './commonUtils.js'
// pure dom specific functions
// for this mod when the document is loaded completely, all dom images/assets realized 

    
    $( document ).ready(function() {
         const origDoc = "June 08, 2021 by Andrew Clark, Brian Vaughn, Christine Abernathy, Dan Abramov, Rachel Nabors, Rick Hanlon, Sebastian Markbåge, and Seth Webster" +
             "\n\n" +
            "The React team is excited to share a few updates:\n" +
            "\n" +
                "We’ve started work on the React 18 release, which will be our next major version.\n" +
                "We’ve created a Working Group to prepare the community for gradual adoption of new features in React 18.\n" +
                "We’ve published a React 18 Alpha so that library authors can try it and provide feedback.\n" +
            "\n" +
            "These updates are primarily aimed at maintainers of third-party libraries. If you’re learning, teaching, or using React to build user-facing applications, you can safely ignore this post. But you are welcome to follow the discussions in the React 18 Working Group if you’re curious!\n\n" +
            "What’s coming in React 18\n" +
            "When it’s released, React 18 will include out-of-the-box improvements (like automatic batching), new APIs (like startTransition), and a new streaming server renderer with built-in support for React.lazy.\n" +
            "\n" +
            "These features are possible thanks to a new opt-in mechanism we’re adding in React 18. It’s called “concurrent rendering” and it lets React prepare multiple versions of the UI at the same time. This change is mostly behind-the-scenes, but it unlocks new possibilities to improve both real and perceived performance of your app.\n" +
            "If you’ve been following our research into the future of React (we don’t expect you to!), you might have heard of something called “concurrent mode” or that it might break your app. In response to this feedback from the community, we’ve redesigned the upgrade strategy for gradual adoption. Instead of an all-or-nothing “mode”, concurrent rendering will only be enabled for updates triggered by one of the new features. In practice, this means you will be able to adopt React 18 without rewrites and try the new features at your own pace.\n" +
            "A gradual adoption strategy\n"+
            "\n" +
            "Since concurrency in React 18 is opt-in, there are no significant out-of-the-box breaking changes to component behavior. You can upgrade to React 18 with minimal or no changes to your application code, with a level of effort comparable to a typical major React release. Based on our experience converting several apps to React 18, we expect that many users will be able to upgrade within a single afternoon.\n" +
            "\n" +
            "We successfully shipped concurrent features to tens of thousands of components at Facebook, and in our experience, we’ve found that most React components “just work” without additional changes. We’re committed to making sure this is a smooth upgrade for the entire community, so today we’re announcing the React 18 Working Group.\n" +
            "Working with the community\n" +
            "\n" +
            "We’re trying something new for this release: We’ve invited a panel of experts, developers, library authors, and educators from across the React community to participate in our React 18 Working Group to provide feedback, ask questions, and collaborate on the release. We couldn’t invite everyone we wanted to this initial, small group, but if this experiment works out, we hope there will be more in the future!\n" +
            "\n" +
            "The goal of the React 18 Working Group is to prepare the ecosystem for a smooth, gradual adoption of React 18 by existing applications and libraries. The Working Group is hosted on GitHub Discussions and is available for the public to read. Members of the working group can leave feedback, ask questions, and share ideas. The core team will also use the discussions repo to share our research findings. As the stable release gets closer, any important information will also be posted on this blog.\n" +
            "\n" +
            "For more information on upgrading to React 18, or additional resources about the release, see the React 18 announcement post.\n";
            
            // used to un-mask the document
            const resetDoc = () =>{ 
                $("textarea").val(origDoc);
                $("#fieldsApplied").text(""); // clear the prior masked fields
            }
            // assign event handlers
            $("#submit").click(getStringTokensToMask); // mask handler
            $("#reset").click(resetDoc); // un-mask handler
            resetDoc();
       
    });

    $( window ).on( "load", function() {
        console.log( "document loaded" ); 
    }); //$( window ).on( "load", function() 