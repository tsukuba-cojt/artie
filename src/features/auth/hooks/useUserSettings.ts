import { useState, useEffect } from "react";

const STORAGE_KEY = "userSettings";

interface UserSettings {
  autoPlayAudioGuide: boolean;
}

const defaultSettings: UserSettings = {
  autoPlayAudioGuide: true,
};

const useUserSettings = () => {
  const [settings, setSettings] = useState<UserSettings>(defaultSettings);

  // 初回レンダリング時にlocalStorageから設定を読み込む
  useEffect(() => {
    const storedSettings = localStorage.getItem(STORAGE_KEY);
    if (storedSettings) {
      try {
        const parsedSettings: Partial<UserSettings> =
          JSON.parse(storedSettings);

        // autoPlayAudioGuide が存在しない場合はデフォルト値を設定
        if (typeof parsedSettings.autoPlayAudioGuide !== "boolean") {
          parsedSettings.autoPlayAudioGuide =
            defaultSettings.autoPlayAudioGuide;
          localStorage.setItem(STORAGE_KEY, JSON.stringify(parsedSettings));
        }

        setSettings({
          ...defaultSettings,
          ...parsedSettings,
        });
      } catch (error) {
        console.error(
          "設定の読み込みに失敗しました。デフォルト設定を使用します。",
          error,
        );
        setSettings(defaultSettings);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultSettings));
      }
    } else {
      // localStorage に設定が存在しない場合はデフォルト設定を保存
      setSettings(defaultSettings);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultSettings));
    }
  }, []);

  // 設定を更新し、localStorageに保存する関数
  const updateSettings = (newSettings: Partial<UserSettings>) => {
    const updatedSettings = { ...settings, ...newSettings };
    setSettings(updatedSettings);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedSettings));
  };

  // 設定をリセットしてデフォルト値に戻す関数
  const resetSettings = () => {
    setSettings(defaultSettings);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultSettings));
  };

  return { settings, updateSettings, resetSettings };
};

export default useUserSettings;
