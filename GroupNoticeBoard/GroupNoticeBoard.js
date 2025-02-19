var User = "elroy";

/* 초기 그룹 화면 구성 */
window.onload = function(){
    var name;
    console.log("find first group");
    for(var i=0; i<Data.user.length; i++){
        if(Data.user[i].Groups[0] !=null){
            name= Data.user[i].Groups[0];
            break;
        }
    }
    console.log("find it!");
    setting(name);
}

function setting(groupname){
    var Group_name = "ForCS3";  
    var group_num=0; // 현 그룹의 번호(Data의 users에서)
    var user_num =0; // 현 유저의 번호
    var number=0;    
    var num=0; // 현 그룹의 번호(Data의 groups에서)
    var n=0; // 현 그룹의 번호(Groups의 groups에서)

    if(groupname!=null){
        Group_name=groupname;
    }

    /* 기존 정보 없애기 */
    document.getElementById("groups").innerHTML=null;
    document.getElementById("group_name").innerHTML=null;
    document.getElementById("group_sum").innerHTML=null;
    document.getElementById("Notice_writer").innerHTML=null;
    document.getElementById("list").innerHTML=null;
    document.getElementById("groups").innerHTML="그룹";


    /* 유저가 가입한 그룹 찾기 */
    group_num=Data.user[user_num].Groups.length;
    var user_group = new Array();
    for(i=0; i<group_num; i++){
        user_group.push(Data.user[user_num].Groups[i]);
        if(Data.user[user_num].Groups[i] == Group_name){
            number = i;
        }
    }
    console.log("find Group");

    /* 유저가 가입한 그룹 표시(사이드바) */
    var groupList = document.createElement("ul");
    var parent=document.getElementById("groups");
    parent.appendChild(groupList);
    for(i=0;i<group_num;i++){
        var lis = document.createElement("a");
        lis.innerHTML = user_group[i];
        lis.style.margin="0px";
        lis.style.padding="5px 3px"
        lis.style.textAlign="center";
        if(user_group[i] == Group_name){
            lis.style.color="black";
        }
        lis.id = i;
        groupList.appendChild(lis);
    }
    console.log("side bar");

    var eventTarget = document.getElementsByTagName("a");
    for(var i=0; i<eventTarget.length;  i++){
        eventTarget[i].addEventListener("click",function(){
            var ns = this.id;
            Group_name=user_group[ns];
            if(Group_name!=null){
                console.log(Group_name+"clickeds");
                setting(Group_name);
            }
        });
    }
console.log("side bar function");

    /* 그룹 이미지 설정 */
    var group_img_src;
    for(i =0; i<Data.groups.length; i++){
        if(Data.groups[i].GroupName==Group_name){
            group_img_src=Data.groups[i].Image;
            num =i;
        }
    }
    document.getElementById("group_img").src=group_img_src;

    /* 그룹 이름 변경 */
    var parent = document.getElementById("group_name");
    var groupNa = document.createElement("h2");
    groupNa.innerHTML = Data.groups[num].GroupName;
    parent.appendChild(groupNa);
    parent.appendChild(document.createElement("hr"));

    /* 그룹 설명 변경 */
    var parent = document.getElementById("group_sum");
    var groupEx = document.createElement("p");
    groupEx.innerHTML = Data.groups[num].Explanation;
    parent.appendChild(groupEx);
console.log("set group info");

    /* 그룹 게시물 불러오기 */
    for(i=0; i<Groups.groups.length; i++){
        console.log(Group_name);
        if(Groups.groups[i].GroupName==Group_name){
            n=i;
            break;
        }
    }
    console.log("call notice list");

    var parent = document.getElementById("list");
    for(i=0; i<Groups.groups[n].Notices.length; i++){
        /* 줄 추가 */
        var tr = document.createElement("tr");
        /* 번호 */
        var th_n = document.createElement("th");
        tr.appendChild(th_n);
        th_n.innerHTML=Groups.groups[n].Notices[i].Number;
        /* 제목 */
        var th_t = document.createElement("th");
        tr.appendChild(th_t);
        th_t.innerHTML=Groups.groups[n].Notices[i].Title;
        /* 작성자 */
        var th_w = document.createElement("th");
        tr.appendChild(th_w);
        th_w.innerHTML=Groups.groups[n].Notices[i].Writer;
        /* 시간 */
        var th_d = document.createElement("th");
        tr.appendChild(th_d);
        th_d.innerHTML=Groups.groups[n].Notices[i].Date;
        /* 최종 추가 */
        parent.appendChild(tr);
        tr.id=i;
    }
    console.log("show notice list");

    /* 게시물별 Modal(Popup)창 띄우기 */
    var eventTarget = document.getElementsByTagName("tr");
    for(var i=1; i<eventTarget.length; i++){
        console.log(i);
        eventTarget[i].addEventListener("click",function(){
            var ns=this.id;
            lookNotice(Groups.groups[n].Notices[ns].Title,Groups.groups[n].Notices[ns].Writer,
                Groups.groups[n].Notices[ns].Date, Groups.groups[n].Notices[ns].Content);
            
        });
    }
    console.log("modal function");
}

/* 게시물 띄우기 */
function lookNotice(title,writer,date,content){
    console.log("open");
    console.log(title);
    var bg = document.getElementById("modal_content");
    var popup = document.getElementById("modal_wrapper");

    bg.style.filter="alpha(Opacity=50)";
    bg.style.display="";
    popup.style.display="";

     /* 제목 */
    var parent =document.getElementById("Notice_title")
    var not_t = document.createElement("h2");
    not_t.innerHTML=title;
    parent.appendChild(not_t);
    
    /* 작성자 */
    var parent =document.getElementById("Notice_writer");
    var not_w = document.createElement("span")
    not_w.innerHTML="작성자: "+writer;
    not_w.style.marginLeft="70%";
    parent.appendChild(not_w);

    /* 시간 */
    var parent =document.getElementById("Notice_date");
    var not_d = document.createElement("span")
    not_d.innerHTML="작성 날짜: "+date;
    not_d.style.marginLeft="70%";
    parent.appendChild(not_d);

    /* 내용 */
    var parent =document.getElementById("contents");
    var C = content.split("&");
    for(i=0; i<C.length; i++){
        var not_c = document.createElement("p");
        not_c.innerHTML = C[i];
        parent.appendChild(not_c);
    }
}

/* 게시물 창 닫기 */
function modalclose(){
    console.log("close");
    document.getElementById("modal_content").style.display = "none";
    document.getElementById("modal_wrapper").style.display="none";
    document.getElementById("Notice_writer").innerHTML=null;
    document.getElementById("Notice_date").innerHTML=null;
    document.getElementById("Notice_title").innerHTML=null;
    document.getElementById("contents").innerHTML=null;
}

/* 게시물 작성 페이지로 이동 */
function Write(){
    location.href="../WriteNotice/WriteNotice.html";
}

/* 친구 추가 modal */
function addFriend(){
    console.log("add open");
    var bg = document.getElementById("add_modal_content");
    var popup = document.getElementById("add_modal_wrapper");

    bg.style.filter="alpha(Opacity=50)";
    bg.style.display="";
    popup.style.display="";
}

/* 친구추가 창 닫기 */
function add_modalclose(){
    console.log("add close");
    document.getElementById("add_modal_content").style.display = "none";
    document.getElementById("add_modal_wrapper").style.display="none";
}

/* 친구 추가 버튼 */
function addFriendEmail(){
    var email = document.getElementById("friend_email").value;
    if(email==""){
        alert("이메일을 입력하세요");
    }
    else{
        alert(email+"을 친구로 추가했습니다!!");
        var n=0;
        for(i=0; i<Data.user.length; i++){
            if(Data.user[i].ID == User){
                n=i;
                break;
            }
        }
        for(i=0; i<Data.user[n].Friends.length; i++ ){
            console.log(User+"의"+i+"번째 친구: " + Data.user[n].Friends[i]);
        }
    }
}