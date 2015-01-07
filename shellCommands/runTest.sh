sh shellCommands/deleteDB.sh
npm install
sh shellCommands/initdb.sh
npm run test 2>error
a=`cat error | wc -c`
b=`cat error`

if [ $a == 0 ]
	then
		echo "success"
	else
		rm -rf error
		echo $b
		echo '-------------------------------------------------------------------------------------------------------------'
		git --no-pager show -s --format='%an <%ae>'| cut -c8-15
		# for (( ; ; ))
		# do
			C:/Program\ Files\ \(x86\)/VideoLAN/VLC/vlc.exe "sound/alert.mp3" vlc://quit
		# done	
fi

rm -rf error