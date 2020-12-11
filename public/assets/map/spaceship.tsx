<?xml version="1.0" encoding="UTF-8"?>
<tileset version="1.4" tiledversion="1.4.3" name="spaceship" tilewidth="48" tileheight="48" tilecount="248" columns="8">
 <image source="../spritesheets/scifi_space_rpg_tiles.png" trans="000000" width="384" height="1530"/>
 <terraintypes>
  <terrain name="Outlined Tiles" tile="12"/>
  <terrain name="Solid floor" tile="35"/>
  <terrain name="Blue Floor" tile="61"/>
  <terrain name="Window" tile="40"/>
  <terrain name="Border" tile="133"/>
  <terrain name="Light Walls" tile="146"/>
  <terrain name="Blue Walls" tile="56"/>
  <terrain name="Pillar" tile="205"/>
  <terrain name="Doorway" tile="90"/>
  <terrain name="Wall Edges" tile="3"/>
 </terraintypes>
 <tile id="0">
  <properties>
   <property name="collides" type="bool" value="false"/>
  </properties>
 </tile>
 <tile id="1" terrain="9,,9,">
  <properties>
   <property name="collides" type="bool" value="true"/>
  </properties>
  <objectgroup draworder="index" id="4">
   <object id="3" x="0" y="0.181818" width="14.1818" height="48.1818"/>
  </objectgroup>
 </tile>
 <tile id="2" terrain=",9,,9">
  <properties>
   <property name="collides" type="bool" value="true"/>
  </properties>
  <objectgroup draworder="index" id="2">
   <object id="3" x="34.3636" y="0" width="13.4545" height="48.1818"/>
  </objectgroup>
 </tile>
 <tile id="3" terrain="9,9,9,">
  <properties>
   <property name="collides" type="bool" value="true"/>
  </properties>
  <objectgroup draworder="index" id="2">
   <object id="1" x="0" y="0.181818" width="13.2727" height="47.4545"/>
   <object id="2" x="12.9091" y="0.363636" width="35.0909" height="13.6364"/>
  </objectgroup>
 </tile>
 <tile id="4" terrain="9,9,,">
  <properties>
   <property name="collides" type="bool" value="true"/>
  </properties>
  <objectgroup draworder="index" id="2">
   <object id="1" x="0.363636" y="0.363636" width="47.0909" height="13.0909"/>
  </objectgroup>
 </tile>
 <tile id="5" terrain="9,9,,">
  <properties>
   <property name="collides" type="bool" value="true"/>
  </properties>
  <objectgroup draworder="index" id="2">
   <object id="1" x="0.181818" y="0" width="47.8182" height="13.6364"/>
  </objectgroup>
 </tile>
 <tile id="6" terrain="9,9,,">
  <properties>
   <property name="collides" type="bool" value="true"/>
  </properties>
  <objectgroup draworder="index" id="3">
   <object id="2" x="0.545455" y="0.181818" width="48" height="13.6364"/>
   <object id="3" x="30" y="8">
    <ellipse/>
   </object>
  </objectgroup>
 </tile>
 <tile id="7" terrain="9,9,,9">
  <properties>
   <property name="collides" type="bool" value="true"/>
  </properties>
  <objectgroup draworder="index" id="3">
   <object id="2" x="0.181818" y="0.181818" width="47.4545" height="13.2727"/>
   <object id="3" x="34.1818" y="11.6364" width="14" height="36.3636"/>
  </objectgroup>
 </tile>
 <tile id="8">
  <properties>
   <property name="collides" type="bool" value="false"/>
  </properties>
 </tile>
 <tile id="9">
  <properties>
   <property name="collides" type="bool" value="false"/>
  </properties>
 </tile>
 <tile id="10" terrain=",9,,">
  <properties>
   <property name="collides" type="bool" value="true"/>
  </properties>
  <objectgroup draworder="index" id="2">
   <object id="1" x="34.7273" y="-0.181818" width="13.2727" height="13.6364"/>
  </objectgroup>
 </tile>
 <tile id="11" terrain="9,,,">
  <properties>
   <property name="collides" type="bool" value="true"/>
  </properties>
  <objectgroup draworder="index" id="2">
   <object id="1" x="-0.545455" y="-0.545455" width="13.8182" height="14"/>
  </objectgroup>
 </tile>
 <tile id="12" terrain=",,,0">
  <properties>
   <property name="collides" type="bool" value="false"/>
  </properties>
 </tile>
 <tile id="13" terrain=",,0,0">
  <properties>
   <property name="collides" type="bool" value="false"/>
  </properties>
 </tile>
 <tile id="14" terrain=",,0,">
  <properties>
   <property name="collides" type="bool" value="false"/>
  </properties>
 </tile>
 <tile id="15">
  <properties>
   <property name="collides" type="bool" value="false"/>
  </properties>
 </tile>
 <tile id="16">
  <properties>
   <property name="collides" type="bool" value="false"/>
  </properties>
 </tile>
 <tile id="17">
  <properties>
   <property name="collides" type="bool" value="false"/>
  </properties>
 </tile>
 <tile id="18">
  <properties>
   <property name="collides" type="bool" value="false"/>
  </properties>
 </tile>
 <tile id="19">
  <properties>
   <property name="collides" type="bool" value="false"/>
  </properties>
 </tile>
 <tile id="20" terrain=",0,,0">
  <properties>
   <property name="collides" type="bool" value="false"/>
  </properties>
 </tile>
 <tile id="21" terrain="0,0,0,0">
  <properties>
   <property name="collides" type="bool" value="false"/>
  </properties>
 </tile>
 <tile id="22" terrain="0,,0,">
  <properties>
   <property name="collides" type="bool" value="false"/>
  </properties>
 </tile>
 <tile id="23">
  <properties>
   <property name="collides" type="bool" value="false"/>
  </properties>
 </tile>
 <tile id="24">
  <properties>
   <property name="collides" type="bool" value="false"/>
  </properties>
 </tile>
 <tile id="25">
  <properties>
   <property name="collides" type="bool" value="false"/>
  </properties>
 </tile>
 <tile id="26">
  <properties>
   <property name="collides" type="bool" value="false"/>
  </properties>
 </tile>
 <tile id="27">
  <properties>
   <property name="collides" type="bool" value="false"/>
  </properties>
 </tile>
 <tile id="28" terrain=",0,,">
  <properties>
   <property name="collides" type="bool" value="false"/>
  </properties>
 </tile>
 <tile id="29" terrain="0,0,,">
  <properties>
   <property name="collides" type="bool" value="false"/>
  </properties>
 </tile>
 <tile id="30" terrain="0,,,">
  <properties>
   <property name="collides" type="bool" value="false"/>
  </properties>
 </tile>
 <tile id="31">
  <properties>
   <property name="collides" type="bool" value="false"/>
  </properties>
 </tile>
 <tile id="32">
  <properties>
   <property name="collides" type="bool" value="false"/>
  </properties>
 </tile>
 <tile id="33">
  <properties>
   <property name="collides" type="bool" value="false"/>
  </properties>
 </tile>
 <tile id="34">
  <properties>
   <property name="collides" type="bool" value="false"/>
  </properties>
 </tile>
 <tile id="35" terrain=",,,1">
  <properties>
   <property name="collides" type="bool" value="false"/>
  </properties>
 </tile>
 <tile id="36" terrain=",,1,1">
  <properties>
   <property name="collides" type="bool" value="false"/>
  </properties>
 </tile>
 <tile id="37" terrain=",,1,">
  <properties>
   <property name="collides" type="bool" value="false"/>
  </properties>
 </tile>
 <tile id="38">
  <properties>
   <property name="collides" type="bool" value="false"/>
  </properties>
 </tile>
 <tile id="39">
  <properties>
   <property name="collides" type="bool" value="false"/>
  </properties>
 </tile>
 <tile id="40" terrain=",,,3">
  <properties>
   <property name="collides" type="bool" value="true"/>
  </properties>
  <objectgroup draworder="index" id="3">
   <object id="2" x="0.181818" y="0.181818" width="47.6364" height="48.1818"/>
  </objectgroup>
 </tile>
 <tile id="41" terrain=",,3,3">
  <properties>
   <property name="collides" type="bool" value="true"/>
  </properties>
  <objectgroup draworder="index" id="2">
   <object id="1" x="0.363636" y="-0.363636" width="47.2727" height="48.3636"/>
  </objectgroup>
 </tile>
 <tile id="42" terrain=",,3,">
  <properties>
   <property name="collides" type="bool" value="true"/>
  </properties>
  <objectgroup draworder="index" id="2">
   <object id="1" x="0.181818" y="0" width="47.6364" height="48.5455"/>
  </objectgroup>
 </tile>
 <tile id="43" terrain=",1,,1">
  <properties>
   <property name="collides" type="bool" value="false"/>
  </properties>
 </tile>
 <tile id="44" terrain="1,1,1,1">
  <properties>
   <property name="collides" type="bool" value="false"/>
  </properties>
 </tile>
 <tile id="45" terrain="1,,1,">
  <properties>
   <property name="collides" type="bool" value="false"/>
  </properties>
 </tile>
 <tile id="46">
  <properties>
   <property name="collides" type="bool" value="false"/>
  </properties>
 </tile>
 <tile id="47">
  <properties>
   <property name="collides" type="bool" value="false"/>
  </properties>
 </tile>
 <tile id="48" terrain=",3,,">
  <properties>
   <property name="collides" type="bool" value="true"/>
  </properties>
  <objectgroup draworder="index" id="4">
   <object id="3" x="0" y="0" width="48.1818" height="15.2727"/>
  </objectgroup>
 </tile>
 <tile id="49" terrain="3,3,,">
  <properties>
   <property name="collides" type="bool" value="true"/>
  </properties>
  <objectgroup draworder="index" id="2">
   <object id="1" x="0.181818" y="0.545455" width="48" height="13.8182"/>
  </objectgroup>
 </tile>
 <tile id="50" terrain="3,,,">
  <properties>
   <property name="collides" type="bool" value="true"/>
  </properties>
  <objectgroup draworder="index" id="2">
   <object id="1" x="0" y="0" width="47.8182" height="15.6364"/>
  </objectgroup>
 </tile>
 <tile id="51" terrain=",1,,">
  <properties>
   <property name="collides" type="bool" value="false"/>
  </properties>
 </tile>
 <tile id="52" terrain="1,1,,">
  <properties>
   <property name="collides" type="bool" value="false"/>
  </properties>
 </tile>
 <tile id="53" terrain="1,,,">
  <properties>
   <property name="collides" type="bool" value="false"/>
  </properties>
 </tile>
 <tile id="54">
  <properties>
   <property name="collides" type="bool" value="false"/>
  </properties>
 </tile>
 <tile id="55">
  <properties>
   <property name="collides" type="bool" value="false"/>
  </properties>
 </tile>
 <tile id="56" terrain=",,,6">
  <properties>
   <property name="collides" type="bool" value="true"/>
  </properties>
  <objectgroup draworder="index" id="2">
   <object id="1" x="-0.181818" y="-0.181818" width="48.3636" height="48"/>
  </objectgroup>
 </tile>
 <tile id="57" terrain=",,6,6">
  <properties>
   <property name="collides" type="bool" value="true"/>
  </properties>
  <objectgroup draworder="index" id="2">
   <object id="1" x="-0.181818" y="0" width="48" height="48.3636"/>
  </objectgroup>
 </tile>
 <tile id="58" terrain=",,6,">
  <properties>
   <property name="collides" type="bool" value="true"/>
  </properties>
  <objectgroup draworder="index" id="2">
   <object id="1" x="-0.181818" y="0" width="48" height="48.1818"/>
  </objectgroup>
 </tile>
 <tile id="59">
  <properties>
   <property name="collides" type="bool" value="true"/>
  </properties>
  <objectgroup draworder="index" id="2">
   <object id="1" x="0" y="-0.545455" width="48.3636" height="49.2727"/>
  </objectgroup>
 </tile>
 <tile id="60">
  <properties>
   <property name="collides" type="bool" value="true"/>
  </properties>
  <objectgroup draworder="index" id="2">
   <object id="1" x="-0.363636" y="-1.27273" width="49.4545" height="50.1818"/>
  </objectgroup>
 </tile>
 <tile id="61" terrain=",,,2">
  <properties>
   <property name="collides" type="bool" value="false"/>
  </properties>
 </tile>
 <tile id="62" terrain=",,2,2">
  <properties>
   <property name="collides" type="bool" value="false"/>
  </properties>
 </tile>
 <tile id="63" terrain=",,2,">
  <properties>
   <property name="collides" type="bool" value="false"/>
  </properties>
 </tile>
 <tile id="64" terrain=",6,,">
  <properties>
   <property name="collides" type="bool" value="true"/>
  </properties>
  <objectgroup draworder="index" id="2">
   <object id="1" x="-0.363636" y="-0.363636" width="48.1818" height="26.7273"/>
  </objectgroup>
 </tile>
 <tile id="65" terrain="6,6,,">
  <properties>
   <property name="collides" type="bool" value="true"/>
  </properties>
  <objectgroup draworder="index" id="2">
   <object id="1" x="0.181818" y="0" width="48" height="25.0909"/>
  </objectgroup>
 </tile>
 <tile id="66" terrain="6,,,">
  <properties>
   <property name="collides" type="bool" value="true"/>
  </properties>
  <objectgroup draworder="index" id="2">
   <object id="1" x="-0.181818" y="-0.545455" width="48.3636" height="26.9091"/>
  </objectgroup>
 </tile>
 <tile id="67">
  <properties>
   <property name="collides" type="bool" value="true"/>
  </properties>
  <objectgroup draworder="index" id="2">
   <object id="1" x="-0.181818" y="-0.363636" width="48.9091" height="49.0909"/>
  </objectgroup>
 </tile>
 <tile id="68">
  <properties>
   <property name="collides" type="bool" value="true"/>
  </properties>
  <objectgroup draworder="index" id="2">
   <object id="1" x="0" y="-0.181818" width="48.5455" height="48.3636"/>
  </objectgroup>
 </tile>
 <tile id="69" terrain=",2,,2">
  <properties>
   <property name="collides" type="bool" value="false"/>
  </properties>
 </tile>
 <tile id="70" terrain="2,2,2,2">
  <properties>
   <property name="collides" type="bool" value="false"/>
  </properties>
 </tile>
 <tile id="71" terrain="2,,2,">
  <properties>
   <property name="collides" type="bool" value="false"/>
  </properties>
 </tile>
 <tile id="72">
  <properties>
   <property name="collides" type="bool" value="true"/>
  </properties>
  <objectgroup draworder="index" id="2">
   <object id="1" x="-0.181818" y="-0.727273" width="48.1818" height="28.9091"/>
  </objectgroup>
 </tile>
 <tile id="73">
  <properties>
   <property name="collides" type="bool" value="false"/>
  </properties>
 </tile>
 <tile id="74">
  <properties>
   <property name="collides" type="bool" value="false"/>
  </properties>
 </tile>
 <tile id="75">
  <properties>
   <property name="collides" type="bool" value="true"/>
  </properties>
  <objectgroup draworder="index" id="2">
   <object id="1" x="0" y="-0.545455" width="47.8182" height="28.5455"/>
  </objectgroup>
 </tile>
 <tile id="76">
  <properties>
   <property name="collides" type="bool" value="true"/>
  </properties>
  <objectgroup draworder="index" id="2">
   <object id="1" x="0" y="0" width="48" height="25.6364"/>
  </objectgroup>
 </tile>
 <tile id="77" terrain=",2,,">
  <properties>
   <property name="collides" type="bool" value="false"/>
  </properties>
 </tile>
 <tile id="78" terrain="2,2,,">
  <properties>
   <property name="collides" type="bool" value="false"/>
  </properties>
 </tile>
 <tile id="79" terrain="2,,,">
  <properties>
   <property name="collides" type="bool" value="false"/>
  </properties>
 </tile>
 <tile id="80">
  <properties>
   <property name="collides" type="bool" value="false"/>
  </properties>
 </tile>
 <tile id="81">
  <properties>
   <property name="collides" type="bool" value="false"/>
  </properties>
 </tile>
 <tile id="82">
  <properties>
   <property name="collides" type="bool" value="false"/>
  </properties>
 </tile>
 <tile id="83">
  <properties>
   <property name="collides" type="bool" value="false"/>
  </properties>
 </tile>
 <tile id="84">
  <properties>
   <property name="collides" type="bool" value="false"/>
  </properties>
 </tile>
 <tile id="85">
  <properties>
   <property name="collides" type="bool" value="false"/>
  </properties>
 </tile>
 <tile id="86">
  <properties>
   <property name="collides" type="bool" value="false"/>
  </properties>
 </tile>
 <tile id="87">
  <properties>
   <property name="collides" type="bool" value="false"/>
  </properties>
 </tile>
 <tile id="88">
  <properties>
   <property name="collides" type="bool" value="false"/>
  </properties>
 </tile>
 <tile id="89">
  <properties>
   <property name="collides" type="bool" value="false"/>
  </properties>
 </tile>
 <tile id="90" terrain=",,,8">
  <properties>
   <property name="collides" type="bool" value="true"/>
  </properties>
  <objectgroup draworder="index" id="2">
   <object id="1" x="-0.909091" y="-0.727273" width="49.2727" height="49.4545"/>
  </objectgroup>
 </tile>
 <tile id="91" terrain=",,8,8">
  <properties>
   <property name="collides" type="bool" value="false"/>
  </properties>
 </tile>
 <tile id="92" terrain=",,8,">
  <properties>
   <property name="collides" type="bool" value="true"/>
  </properties>
  <objectgroup draworder="index" id="2">
   <object id="1" x="-0.181818" y="-0.181818" width="48.3636" height="48.1818"/>
  </objectgroup>
 </tile>
 <tile id="93">
  <properties>
   <property name="collides" type="bool" value="false"/>
  </properties>
 </tile>
 <tile id="94">
  <properties>
   <property name="collides" type="bool" value="false"/>
  </properties>
 </tile>
 <tile id="95">
  <properties>
   <property name="collides" type="bool" value="false"/>
  </properties>
 </tile>
 <tile id="96">
  <properties>
   <property name="collides" type="bool" value="false"/>
  </properties>
 </tile>
 <tile id="97">
  <properties>
   <property name="collides" type="bool" value="false"/>
  </properties>
 </tile>
 <tile id="98" terrain=",8,,">
  <properties>
   <property name="collides" type="bool" value="true"/>
  </properties>
  <objectgroup draworder="index" id="2">
   <object id="1" x="-0.363636" y="-0.363636" width="48.7273" height="27.8182"/>
  </objectgroup>
 </tile>
 <tile id="99" terrain="8,8,,">
  <properties>
   <property name="collides" type="bool" value="false"/>
  </properties>
 </tile>
 <tile id="100" terrain="8,,,">
  <properties>
   <property name="collides" type="bool" value="true"/>
  </properties>
  <objectgroup draworder="index" id="2">
   <object id="1" x="0.181818" y="-0.181818" width="48" height="26.9091"/>
  </objectgroup>
 </tile>
 <tile id="101">
  <properties>
   <property name="collides" type="bool" value="false"/>
  </properties>
 </tile>
 <tile id="102">
  <properties>
   <property name="collides" type="bool" value="false"/>
  </properties>
 </tile>
 <tile id="103">
  <properties>
   <property name="collides" type="bool" value="false"/>
  </properties>
 </tile>
 <tile id="104">
  <properties>
   <property name="collides" type="bool" value="false"/>
  </properties>
 </tile>
 <tile id="105">
  <properties>
   <property name="collides" type="bool" value="false"/>
  </properties>
 </tile>
 <tile id="106">
  <properties>
   <property name="collides" type="bool" value="false"/>
  </properties>
 </tile>
 <tile id="107">
  <properties>
   <property name="collides" type="bool" value="false"/>
  </properties>
 </tile>
 <tile id="108">
  <properties>
   <property name="collides" type="bool" value="false"/>
  </properties>
 </tile>
 <tile id="109">
  <properties>
   <property name="collides" type="bool" value="false"/>
  </properties>
 </tile>
 <tile id="110">
  <properties>
   <property name="collides" type="bool" value="false"/>
  </properties>
 </tile>
 <tile id="111">
  <properties>
   <property name="collides" type="bool" value="false"/>
  </properties>
 </tile>
 <tile id="112">
  <properties>
   <property name="collides" type="bool" value="false"/>
  </properties>
 </tile>
 <tile id="113">
  <properties>
   <property name="collides" type="bool" value="false"/>
  </properties>
 </tile>
 <tile id="114">
  <properties>
   <property name="collides" type="bool" value="false"/>
  </properties>
 </tile>
 <tile id="115">
  <properties>
   <property name="collides" type="bool" value="false"/>
  </properties>
 </tile>
 <tile id="116">
  <properties>
   <property name="collides" type="bool" value="false"/>
  </properties>
 </tile>
 <tile id="117">
  <properties>
   <property name="collides" type="bool" value="false"/>
  </properties>
 </tile>
 <tile id="118">
  <properties>
   <property name="collides" type="bool" value="false"/>
  </properties>
 </tile>
 <tile id="119">
  <properties>
   <property name="collides" type="bool" value="false"/>
  </properties>
 </tile>
 <tile id="120">
  <properties>
   <property name="collides" type="bool" value="false"/>
  </properties>
 </tile>
 <tile id="121">
  <properties>
   <property name="collides" type="bool" value="false"/>
  </properties>
 </tile>
 <tile id="122">
  <properties>
   <property name="collides" type="bool" value="false"/>
  </properties>
 </tile>
 <tile id="123">
  <properties>
   <property name="collides" type="bool" value="false"/>
  </properties>
 </tile>
 <tile id="124">
  <properties>
   <property name="collides" type="bool" value="false"/>
  </properties>
 </tile>
 <tile id="125">
  <properties>
   <property name="collides" type="bool" value="false"/>
  </properties>
 </tile>
 <tile id="126">
  <properties>
   <property name="collides" type="bool" value="false"/>
  </properties>
 </tile>
 <tile id="127">
  <properties>
   <property name="collides" type="bool" value="false"/>
  </properties>
 </tile>
 <tile id="128">
  <properties>
   <property name="collides" type="bool" value="false"/>
  </properties>
 </tile>
 <tile id="129">
  <properties>
   <property name="collides" type="bool" value="false"/>
  </properties>
 </tile>
 <tile id="130">
  <properties>
   <property name="collides" type="bool" value="false"/>
  </properties>
 </tile>
 <tile id="131">
  <properties>
   <property name="collides" type="bool" value="true"/>
  </properties>
  <objectgroup draworder="index" id="2">
   <object id="1" x="0.181818" y="-0.181818" width="47.8182" height="48.3636"/>
  </objectgroup>
 </tile>
 <tile id="132">
  <properties>
   <property name="collides" type="bool" value="true"/>
  </properties>
  <objectgroup draworder="index" id="2">
   <object id="1" x="0" y="-0.545455" width="48.7273" height="48.3636"/>
  </objectgroup>
 </tile>
 <tile id="133" terrain=",,,4">
  <properties>
   <property name="collides" type="bool" value="true"/>
  </properties>
  <objectgroup draworder="index" id="2">
   <object id="1" x="9.81818" y="0.727273">
    <polygon points="0,0 -9.09091,9.45455 -9.45455,47.2727 38.5455,47.2727 38,-0.909091"/>
   </object>
  </objectgroup>
 </tile>
 <tile id="134" terrain=",,4,4">
  <properties>
   <property name="collides" type="bool" value="true"/>
  </properties>
  <objectgroup draworder="index" id="2">
   <object id="1" x="-0.181818" y="-0.545455" width="48.7273" height="48.9091"/>
  </objectgroup>
 </tile>
 <tile id="135" terrain=",,4,">
  <properties>
   <property name="collides" type="bool" value="true"/>
  </properties>
  <objectgroup draworder="index" id="2">
   <object id="1" x="36.7273" y="-0.181818">
    <polygon points="0,0 10.7273,10 11.4545,47.8182 -36.3636,48.1818 -36.9091,-0.545455"/>
   </object>
  </objectgroup>
 </tile>
 <tile id="136">
  <properties>
   <property name="collides" type="bool" value="false"/>
  </properties>
 </tile>
 <tile id="137">
  <properties>
   <property name="collides" type="bool" value="false"/>
  </properties>
 </tile>
 <tile id="138">
  <properties>
   <property name="collides" type="bool" value="false"/>
  </properties>
 </tile>
 <tile id="139">
  <properties>
   <property name="collides" type="bool" value="true"/>
  </properties>
  <objectgroup draworder="index" id="2">
   <object id="1" x="-0.181818" y="0" width="48" height="47.8182"/>
  </objectgroup>
 </tile>
 <tile id="140">
  <properties>
   <property name="collides" type="bool" value="true"/>
  </properties>
  <objectgroup draworder="index" id="2">
   <object id="1" x="0" y="-0.363636" width="48" height="48.7273"/>
  </objectgroup>
 </tile>
 <tile id="141" terrain=",4,,4">
  <properties>
   <property name="collides" type="bool" value="true"/>
  </properties>
  <objectgroup draworder="index" id="2">
   <object id="1" x="0" y="-0.181818" width="48.5455" height="48.3636"/>
  </objectgroup>
 </tile>
 <tile id="142" terrain="4,4,4,4">
  <properties>
   <property name="collides" type="bool" value="true"/>
  </properties>
  <objectgroup draworder="index" id="2">
   <object id="1" x="-0.363636" y="-0.545455" width="49.2727" height="48.7273"/>
  </objectgroup>
 </tile>
 <tile id="143" terrain="4,,4,">
  <properties>
   <property name="collides" type="bool" value="true"/>
  </properties>
  <objectgroup draworder="index" id="2">
   <object id="1" x="0.181818" y="-0.363636" width="47.8182" height="48.7273"/>
  </objectgroup>
 </tile>
 <tile id="144">
  <properties>
   <property name="collides" type="bool" value="false"/>
  </properties>
 </tile>
 <tile id="145">
  <properties>
   <property name="collides" type="bool" value="false"/>
  </properties>
 </tile>
 <tile id="146" terrain=",,,5">
  <properties>
   <property name="collides" type="bool" value="true"/>
  </properties>
  <objectgroup draworder="index" id="3">
   <object id="3" x="0" y="0" width="47.8182" height="48.7273"/>
  </objectgroup>
 </tile>
 <tile id="147" terrain=",,5,5">
  <properties>
   <property name="collides" type="bool" value="true"/>
  </properties>
  <objectgroup draworder="index" id="2">
   <object id="1" x="-0.545455" y="-0.181818" width="48.9091" height="48.5455"/>
  </objectgroup>
 </tile>
 <tile id="148" terrain=",,5,">
  <properties>
   <property name="collides" type="bool" value="true"/>
  </properties>
  <objectgroup draworder="index" id="2">
   <object id="1" x="0.545455" y="-0.545455" width="47.6364" height="48.9091"/>
  </objectgroup>
 </tile>
 <tile id="149" terrain=",4,,">
  <properties>
   <property name="collides" type="bool" value="true"/>
  </properties>
  <objectgroup draworder="index" id="2">
   <object id="1" x="0.545455" y="0.181818">
    <polygon points="0,0 -0.363636,37.4545 10.3636,47.8182 47.6364,47.4545 47.6364,0"/>
   </object>
  </objectgroup>
 </tile>
 <tile id="150" terrain="4,4,,">
  <properties>
   <property name="collides" type="bool" value="true"/>
  </properties>
  <objectgroup draworder="index" id="2">
   <object id="1" x="-0.181818" y="0.181818" width="48" height="47.8182"/>
  </objectgroup>
 </tile>
 <tile id="151" terrain="4,,,">
  <properties>
   <property name="collides" type="bool" value="true"/>
  </properties>
  <objectgroup draworder="index" id="2">
   <object id="1" x="48" y="0.363636">
    <polygon points="0,0 -48.1818,-0.727273 -48.1818,47.4545 -10,47.2727 0.363636,36.9091"/>
   </object>
  </objectgroup>
 </tile>
 <tile id="152">
  <properties>
   <property name="collides" type="bool" value="false"/>
  </properties>
 </tile>
 <tile id="153">
  <properties>
   <property name="collides" type="bool" value="false"/>
  </properties>
 </tile>
 <tile id="154" terrain=",5,,5">
  <properties>
   <property name="collides" type="bool" value="true"/>
  </properties>
  <objectgroup draworder="index" id="2">
   <object id="1" x="0.181818" y="0.181818" width="48.1818" height="48.3636"/>
  </objectgroup>
 </tile>
 <tile id="155" terrain="5,5,5,5">
  <properties>
   <property name="collides" type="bool" value="true"/>
  </properties>
  <objectgroup draworder="index" id="2">
   <object id="1" x="0.181818" y="0.181818" width="48.1818" height="48.1818"/>
  </objectgroup>
 </tile>
 <tile id="156" terrain="5,,5,">
  <properties>
   <property name="collides" type="bool" value="true"/>
  </properties>
  <objectgroup draworder="index" id="2">
   <object id="1" x="-0.181818" y="0.181818" width="47.8182" height="47.2727"/>
  </objectgroup>
 </tile>
 <tile id="157">
  <properties>
   <property name="collides" type="bool" value="false"/>
  </properties>
 </tile>
 <tile id="158">
  <properties>
   <property name="collides" type="bool" value="false"/>
  </properties>
 </tile>
 <tile id="159">
  <properties>
   <property name="collides" type="bool" value="false"/>
  </properties>
 </tile>
 <tile id="160">
  <properties>
   <property name="collides" type="bool" value="false"/>
  </properties>
 </tile>
 <tile id="161">
  <properties>
   <property name="collides" type="bool" value="false"/>
  </properties>
 </tile>
 <tile id="162" terrain=",5,,">
  <properties>
   <property name="collides" type="bool" value="true"/>
  </properties>
  <objectgroup draworder="index" id="2">
   <object id="1" x="-0.181818" y="-0.181818" width="47.8182" height="27.4545"/>
  </objectgroup>
 </tile>
 <tile id="163" terrain="5,5,,">
  <properties>
   <property name="collides" type="bool" value="true"/>
  </properties>
  <objectgroup draworder="index" id="2">
   <object id="1" x="-0.545455" y="-0.727273" width="47.8182" height="27.2727"/>
  </objectgroup>
 </tile>
 <tile id="164" terrain="5,,,">
  <properties>
   <property name="collides" type="bool" value="true"/>
  </properties>
  <objectgroup draworder="index" id="2">
   <object id="1" x="-1.81818" y="-1.09091" width="50.1818" height="26.9091"/>
  </objectgroup>
 </tile>
 <tile id="165">
  <properties>
   <property name="collides" type="bool" value="false"/>
  </properties>
 </tile>
 <tile id="166">
  <properties>
   <property name="collides" type="bool" value="false"/>
  </properties>
 </tile>
 <tile id="167">
  <properties>
   <property name="collides" type="bool" value="false"/>
  </properties>
 </tile>
 <tile id="168">
  <properties>
   <property name="collides" type="bool" value="false"/>
  </properties>
 </tile>
 <tile id="169">
  <properties>
   <property name="collides" type="bool" value="false"/>
  </properties>
 </tile>
 <tile id="170">
  <properties>
   <property name="collides" type="bool" value="false"/>
  </properties>
 </tile>
 <tile id="171">
  <properties>
   <property name="collides" type="bool" value="false"/>
  </properties>
 </tile>
 <tile id="172">
  <properties>
   <property name="collides" type="bool" value="false"/>
  </properties>
 </tile>
 <tile id="173">
  <properties>
   <property name="collides" type="bool" value="false"/>
  </properties>
 </tile>
 <tile id="174">
  <properties>
   <property name="collides" type="bool" value="false"/>
  </properties>
 </tile>
 <tile id="175">
  <properties>
   <property name="collides" type="bool" value="false"/>
  </properties>
 </tile>
 <tile id="176">
  <properties>
   <property name="collides" type="bool" value="false"/>
  </properties>
 </tile>
 <tile id="177">
  <properties>
   <property name="collides" type="bool" value="false"/>
  </properties>
 </tile>
 <tile id="178">
  <properties>
   <property name="collides" type="bool" value="false"/>
  </properties>
 </tile>
 <tile id="179">
  <properties>
   <property name="collides" type="bool" value="false"/>
  </properties>
 </tile>
 <tile id="180">
  <properties>
   <property name="collides" type="bool" value="false"/>
  </properties>
 </tile>
 <tile id="181">
  <properties>
   <property name="collides" type="bool" value="false"/>
  </properties>
 </tile>
 <tile id="182">
  <properties>
   <property name="collides" type="bool" value="false"/>
  </properties>
 </tile>
 <tile id="183">
  <properties>
   <property name="collides" type="bool" value="false"/>
  </properties>
 </tile>
 <tile id="184">
  <properties>
   <property name="collides" type="bool" value="false"/>
  </properties>
 </tile>
 <tile id="185">
  <properties>
   <property name="collides" type="bool" value="false"/>
  </properties>
 </tile>
 <tile id="186">
  <properties>
   <property name="collides" type="bool" value="false"/>
  </properties>
 </tile>
 <tile id="187">
  <properties>
   <property name="collides" type="bool" value="false"/>
  </properties>
 </tile>
 <tile id="188">
  <properties>
   <property name="collides" type="bool" value="false"/>
  </properties>
 </tile>
 <tile id="189">
  <properties>
   <property name="collides" type="bool" value="false"/>
  </properties>
 </tile>
 <tile id="190">
  <properties>
   <property name="collides" type="bool" value="false"/>
  </properties>
 </tile>
 <tile id="191">
  <properties>
   <property name="collides" type="bool" value="false"/>
  </properties>
 </tile>
 <tile id="192">
  <properties>
   <property name="collides" type="bool" value="false"/>
  </properties>
 </tile>
 <tile id="193">
  <properties>
   <property name="collides" type="bool" value="false"/>
  </properties>
 </tile>
 <tile id="194">
  <properties>
   <property name="collides" type="bool" value="false"/>
  </properties>
 </tile>
 <tile id="195">
  <properties>
   <property name="collides" type="bool" value="false"/>
  </properties>
 </tile>
 <tile id="196">
  <properties>
   <property name="collides" type="bool" value="false"/>
  </properties>
 </tile>
 <tile id="197">
  <properties>
   <property name="collides" type="bool" value="false"/>
  </properties>
 </tile>
 <tile id="198">
  <properties>
   <property name="collides" type="bool" value="false"/>
  </properties>
 </tile>
 <tile id="199">
  <properties>
   <property name="collides" type="bool" value="false"/>
  </properties>
 </tile>
 <tile id="200">
  <properties>
   <property name="collides" type="bool" value="false"/>
  </properties>
 </tile>
 <tile id="201">
  <properties>
   <property name="collides" type="bool" value="false"/>
  </properties>
 </tile>
 <tile id="202">
  <properties>
   <property name="collides" type="bool" value="false"/>
  </properties>
 </tile>
 <tile id="203">
  <properties>
   <property name="collides" type="bool" value="false"/>
  </properties>
 </tile>
 <tile id="204">
  <properties>
   <property name="collides" type="bool" value="false"/>
  </properties>
 </tile>
 <tile id="205" terrain=",,,7">
  <properties>
   <property name="collides" type="bool" value="true"/>
  </properties>
  <objectgroup draworder="index" id="2">
   <object id="1" x="-4" y="-2.18182" width="52.3636" height="50.9091"/>
  </objectgroup>
 </tile>
 <tile id="206" terrain=",,7,">
  <properties>
   <property name="collides" type="bool" value="true"/>
  </properties>
  <objectgroup draworder="index" id="2">
   <object id="1" x="-0.363636" y="-1.63636" width="49.4545" height="51.2727"/>
  </objectgroup>
 </tile>
 <tile id="207">
  <properties>
   <property name="collides" type="bool" value="false"/>
  </properties>
 </tile>
 <tile id="208">
  <properties>
   <property name="collides" type="bool" value="false"/>
  </properties>
 </tile>
 <tile id="209">
  <properties>
   <property name="collides" type="bool" value="false"/>
  </properties>
 </tile>
 <tile id="210">
  <properties>
   <property name="collides" type="bool" value="false"/>
  </properties>
 </tile>
 <tile id="211">
  <properties>
   <property name="collides" type="bool" value="false"/>
  </properties>
 </tile>
 <tile id="212">
  <properties>
   <property name="collides" type="bool" value="false"/>
  </properties>
 </tile>
 <tile id="213" terrain=",7,,7">
  <properties>
   <property name="collides" type="bool" value="true"/>
  </properties>
  <objectgroup draworder="index" id="2">
   <object id="1" x="-0.545455" y="-1.45455" width="48.9091" height="51.4545"/>
  </objectgroup>
 </tile>
 <tile id="214" terrain="7,,7,">
  <properties>
   <property name="collides" type="bool" value="true"/>
  </properties>
  <objectgroup draworder="index" id="2">
   <object id="1" x="-0.545455" y="-0.545455" width="49.2727" height="49.6364"/>
  </objectgroup>
 </tile>
 <tile id="215">
  <properties>
   <property name="collides" type="bool" value="false"/>
  </properties>
 </tile>
 <tile id="216">
  <properties>
   <property name="collides" type="bool" value="false"/>
  </properties>
 </tile>
 <tile id="217">
  <properties>
   <property name="collides" type="bool" value="false"/>
  </properties>
 </tile>
 <tile id="218">
  <properties>
   <property name="collides" type="bool" value="false"/>
  </properties>
 </tile>
 <tile id="219">
  <properties>
   <property name="collides" type="bool" value="false"/>
  </properties>
 </tile>
 <tile id="220">
  <properties>
   <property name="collides" type="bool" value="false"/>
  </properties>
 </tile>
 <tile id="221" terrain=",7,,7">
  <properties>
   <property name="collides" type="bool" value="true"/>
  </properties>
  <objectgroup draworder="index" id="2">
   <object id="1" x="-0.363636" y="-0.181818" width="49.2727" height="48.7273"/>
  </objectgroup>
 </tile>
 <tile id="222" terrain="7,,7,">
  <properties>
   <property name="collides" type="bool" value="true"/>
  </properties>
  <objectgroup draworder="index" id="2">
   <object id="1" x="0" y="-0.363636" width="48" height="48.7273"/>
  </objectgroup>
 </tile>
 <tile id="223">
  <properties>
   <property name="collides" type="bool" value="false"/>
  </properties>
 </tile>
 <tile id="224">
  <properties>
   <property name="collides" type="bool" value="false"/>
  </properties>
 </tile>
 <tile id="225">
  <properties>
   <property name="collides" type="bool" value="false"/>
  </properties>
 </tile>
 <tile id="226">
  <properties>
   <property name="collides" type="bool" value="false"/>
  </properties>
 </tile>
 <tile id="227">
  <properties>
   <property name="collides" type="bool" value="false"/>
  </properties>
 </tile>
 <tile id="228">
  <properties>
   <property name="collides" type="bool" value="false"/>
  </properties>
 </tile>
 <tile id="229" terrain=",7,,">
  <properties>
   <property name="collides" type="bool" value="false"/>
  </properties>
 </tile>
 <tile id="230" terrain="7,,,">
  <properties>
   <property name="collides" type="bool" value="false"/>
  </properties>
 </tile>
 <tile id="231">
  <properties>
   <property name="collides" type="bool" value="false"/>
  </properties>
 </tile>
 <tile id="232">
  <properties>
   <property name="collides" type="bool" value="false"/>
  </properties>
 </tile>
 <tile id="233">
  <properties>
   <property name="collides" type="bool" value="false"/>
  </properties>
 </tile>
 <tile id="234">
  <properties>
   <property name="collides" type="bool" value="false"/>
  </properties>
 </tile>
 <tile id="235">
  <properties>
   <property name="collides" type="bool" value="false"/>
  </properties>
 </tile>
 <tile id="236">
  <properties>
   <property name="collides" type="bool" value="false"/>
  </properties>
 </tile>
 <tile id="237">
  <properties>
   <property name="collides" type="bool" value="false"/>
  </properties>
 </tile>
 <tile id="238">
  <properties>
   <property name="collides" type="bool" value="false"/>
  </properties>
 </tile>
 <tile id="239">
  <properties>
   <property name="collides" type="bool" value="false"/>
  </properties>
 </tile>
 <tile id="240">
  <properties>
   <property name="collides" type="bool" value="false"/>
  </properties>
 </tile>
 <tile id="241">
  <properties>
   <property name="collides" type="bool" value="false"/>
  </properties>
 </tile>
 <tile id="242">
  <properties>
   <property name="collides" type="bool" value="false"/>
  </properties>
 </tile>
 <tile id="243">
  <properties>
   <property name="collides" type="bool" value="false"/>
  </properties>
 </tile>
 <tile id="244">
  <properties>
   <property name="collides" type="bool" value="false"/>
  </properties>
 </tile>
 <tile id="245">
  <properties>
   <property name="collides" type="bool" value="false"/>
  </properties>
 </tile>
 <tile id="246">
  <properties>
   <property name="collides" type="bool" value="false"/>
  </properties>
 </tile>
 <tile id="247">
  <properties>
   <property name="collides" type="bool" value="false"/>
  </properties>
 </tile>
</tileset>
