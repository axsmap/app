import Link from "next/link";
import React from "react";

const Faq = () => {
  return (
    <div className="px-6 py-6">
      <h4 className="flex flex items-center justify-center mt-2">FAQ</h4>
      <div className="flex justify-center mb-8">
        <iframe
          width="560"
          height="315"
          src="https://www.youtube.com/embed/7iUUeLaiUBE?rel=0"
          title="AXS Map: Join the Movement Today"
          frameBorder="0"
          allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>

      <div className="mt-6">
        <div className="flex flex items-center justify-center text-lg font-medium text-gray-800 mb-2">
          <strong>How do I rate a venue?</strong>
        </div>
        <div className="text-base text-gray-800 mb-4">
          <p className="mt-6 flex flex items-center justify-center">
            {" "}
            AXS Map takes you through an intuitive rating process, but consider
            the following criteria when rating a venue:
          </p>
          <div className="mt-6 flex flex items-center justify-center ">
            <ul className="list-disc pl-6">
              <li>
                Entrance – does the entrance have steps, a ramp, reserved
                parking, a second entrance, or a wide entrance?
              </li>
              <li>
                Interior – does the interior have room to move, a ramp, an
                accessible elevator, or an accessible table height?
              </li>
              <li>
                Restroom – does the restroom door swing out, have large stalls,
                supports around the toilet, or lowered sinks?
              </li>
              <li>
                Other – is the venue well-lit, have a high noise level, or allow
                service dogs?
              </li>
            </ul>
          </div>
        </div>

        <div className="flex flex items-center justify-center text-lg font-medium text-gray-800 mb-2">
          <strong>Can I add a place that's not on AXS Map?</strong>
        </div>
        <div className="text-base text-gray-800 mb-4">
          <p className="flex flex items-center justify-center ">
            {" "}
            No - AXS Map pulls from the Google Places database to populate its
            maps. Google Places is working to catalogue businesses around the
            world. If a place is missing, we recommend submitting an inquiry to{" "}
            {/* <Link href="https://www.google.com" className="text-blue-500">
              Google
            </Link> */}
          </p>
        </div>

        <div className="flex flex items-center justify-center text-lg font-medium text-gray-800 mb-2">
          <strong>
            In my neighborhood or city, there are a lot of places that haven't
            been reviewed. What should I do?
          </strong>
        </div>
        <div className="text-base text-gray-600 mb-6">
          <p className="flex flex items-center justify-center">
            {" "}
            We need communities to band together to map their neighborhoods. At
            AXS Map we’ve started a special tool to help you and your community
            do this. It's called the 'Mapathons' tool, & you should check it
            out! It works like this: to jumpstart your community's accessibility
            push we recommend having an event where a large group of people
            together to go out and strategically map out the neighborhood. If
            you don't want to start a Mapathon, you can join one – we offer all
            the tools for you to make it happen. Check out the{" "}
            {/* <Link href="/mapathons" className="text-blue-500">
              Mapathons page here
            </Link> */}
          </p>
        </div>

        <div className="flex flex items-center justify-center text-lg font-medium text-gray-800 mb-2">
          <strong>Can I review places where I don't live?</strong>
        </div>
        <div className="text-base text-gray-800 mb-4">
          <p className="flex flex items-center justify-center ">
            {" "}
            Absolutely. If you have been to a place and have a good memory of it
            (perhaps it's a place you frequent) feel free to give a review!
          </p>
        </div>
        <div className="flex flex items-center justify-center text-lg font-medium text-gray-800 mb-2">
          <strong>Do I have to register in order to use AXS Map?</strong>
        </div>
        <div className="text-base text-gray-800 mb-4">
          <p className="flex flex items-center justify-center ">
            {" "}
            No, you do not need to join in order to use AXS Map. Without
            joining, you will still be able to see all the reviews on AXS Map,
            and you will have full access to everything on our maps. But if you
            would like to give reviews we will need you to join first. Joining
            is free and easy ,& all information you provide to AXS Map will
            remain anonymous.
          </p>
        </div>

        <div className="flex flex items-center justify-center text-lg font-medium text-gray-800 mb-2">
          <strong>
            How do I find a place I want to review on the AXS Map database?
          </strong>
        </div>
        <p className="mt-2 flex flex items-center justify-center">
          There are several ways to find a place on AXS Map.
        </p>
        <div className="text-base text-gray-800 mt-6">
          <p className="flex flex items-center justify-center ">
            On the main page for AXS Map you will see two search boxes. If you
            are looking for 'Joe's Coffee' in Biloxi, Louisiana, then you would
            type in 'Joe's Coffee' in the left search bar and 'Biloxi,
            Louisiana' in the search bar on the right. If you are in a dense
            city like New York City it is helpful to type in the name of the
            location on the left and either a nearby address or the actual
            address in the right hand box.
          </p>
          <p className="mt-4 flex flex items-center justify-center ">
            Another approach is to search 'Everything' in the left searchbar and
            then on the right input an address at or nearby your location. The
            map will return 20 pins of businesses and places near that address.
            For the best results, include the zip code in the address. You can
            then choose to scroll through the search results or you can explore
            the map by panning and zooming. The zoom is in the upper left corner
            of the map. After zooming you can hit the 'Refresh' button
            (magnifying glass icon) in the lower right corner of the map to
            refresh the results. Each time you hit the Refresh button, the map
            will return 20 new pins in the area you've zoomed in on.
          </p>
          <p className="mt-4 flex flex items-center justify-center ">
            If you've tried these Search approaches and can't find the place
            you'd like to review, it may be that the Google Places database has
            not indexed that business. In this case, we encourage you to contact
            Google in order for the location to be added to the database.
          </p>
        </div>

        <div className="flex flex items-center justify-center text-lg font-medium text-gray-900 mt-4">
          <strong>What's the process for a Mapathon™?</strong>
        </div>
        <p className="mt-4 flex flex items-center justify-center">
          Have you watched our Mapathon animation? If not, then see it here.
        </p>
        <div className="flex justify-center mt-8">
          <iframe
            width="560"
            height="315"
            src="https://www.youtube.com/embed/iERusV-vEIs?si=zBEMcpknaioY59uC"
            title="AXS Map: Join the Movement Today"
            frameBorder="0"
            allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>

        <div className="flex flex items-center justify-center text-lg font-medium text-gray-900 mt-4">
          <strong>Mapathon Toolkit</strong>
        </div>
        <div className="text-base text-gray-800 mb-4">
          <strong>Paper review forms:</strong> These forms allow your
          participants to enter reviews on paper. This is a good thing to have
          in case someone’s phone doesn’t work or in case a participant doesn’t
          have a phone.
        </div>
        <div className="text-base text-gray-800 mb-4">
          <strong>Brochure for handing out to businesses: </strong> When your
          Mapathon participants are out roaming the neighborhoods, sometimes it
          can be a bit startling to a business owner when they request to ‘see’
          their bathroom. Here’s a brochure to help your Mapathoners introduce
          themselves to a business owner politely and explain what they’re
          doing.
        </div>
        <div className="text-base text-gray-800 mb-4">
          <strong>How to rate:</strong> Guidance on Giving Reviews - Some of
          your participants may like to see some guidance on giving reviews.
          This document will provide some tips and instructions.
        </div>
        <p className="mt-4 flex flex items-center justify-center">
          These are the steps for a typical Mapathon:
        </p>
        <ol className="mt-8 list-decimal pl-6 space-y-2 text-gray-800">
          <li>
            <span className="font-medium">Schedule the Mapathon:</span> We
            recommend setting a 4-hour period for a Saturday or Sunday, but you
            can set your Mapathon for a longer time period if you prefer - it
            can last a whole week!
          </li>
          <li>
            <span className="font-medium">Invite people to participate:</span>{" "}
            Invite as many people to your Mapathon as possible.
          </li>
          <li>
            <span className="font-medium">Kickoff the Mapathon:</span> It’s
            usually best for everyone to meet in one spot for a kickoff. (You
            can also have a virtual kickoff if preferred for you and your
            participants.)
          </li>
          <li>
            <span className="font-medium">
              Give a Quick Training to Participants:
            </span>{" "}
            We show volunteers our 'How To Rate' video and give them some other
            background from our toolkit. The toolkit includes a 'Tips' page
            which describes how you can use AXS Map from your phone’s web
            browser (Safari or Chrome) or use the AXS Map application for
            Android or iPhone. If you don’t have a phone, you can even use paper
            forms, which are also part of the toolkit.
          </li>
          <li>
            <span className="font-medium">Register for AXS Map:</span> Make sure
            all participants have registered on AXS Map so they can input
            reviews. This is very easy - it just requires an email address!
          </li>
          <li>
            <span className="font-medium">Register for the Mapathon:</span> Make
            sure your participants register for the Mapathon so we can count
            their reviews. This way at the end of the day you will know how many
            reviews were inputted from your Mapathon!
          </li>
          <li>
            <span className="font-medium">Divide into Teams:</span> After your
            volunteers have received about 10 mins of training, divide them into
            teams of 2-3 people and assign each team to map a different
            neighborhood.
          </li>
          <li>
            <span className="font-medium">Register your teams (optional):</span>{" "}
            if you want your teams to compete, make sure volunteers join teams
            using the AXS Map tool. This way we&rsquo;ll be able to track each
            team's number of reviews.
          </li>
          <li>
            <span className="font-medium">Assign Neighborhoods to Teams: </span>{" "}
            It is important that teams know what blocks of a city to cover. This
            can take the form of assigning a zip code, or setting up a 5 by 5
            block area for each team.
          </li>
          <li>
            <span className="font-medium">Offer Prizes (optional):</span>If you
            are offering prizes to the team or individual that inputs the most
            reviews, show them the'Scoreboard' page and outline your prizes.
          </li>

          <li>
            <span className="font-medium">Offer T-shirts (Optional): </span>If
            you're handing out AXS Map t-shirts, hand them out now!
          </li>

          <li>
            <span className="font-medium"></span>Send teams and individuals out
            to map.
          </li>
          <li>
            <span className="font-medium">Watch the Scoreboard:</span> You may
            track your volunteers and teams on the Scorecard page. The
            Scoreboard will update in real time.
          </li>
          <li>
            <span className="font-medium">
              Meeting back at the kickoff location (optional):{" "}
            </span>{" "}
            At the end of the day, we recommend meeting back at the Kickoff
            location to hand out prizes and/or give all the volunteers a thank
            you. If participants have traveled long distances to participate in
            the Mapathon, you may decide it's better to skip this final step.
            This part is up to you!
          </li>
        </ol>
      </div>
    </div>
  );
};

export default Faq;
